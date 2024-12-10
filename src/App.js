// App.js
import React, { useState } from 'react';
import FindPiInput from './UI/Input/FindPiInput';
import './App.css';
import PiSeries from './components/PiSeries/PiSeries';
import FindPiButton from './UI/FingPiButton/FindPiButton';
import Tooltip from './UI/ToolTip/ToolTip';

function App() {
  const [expNum, setExpNum] = useState(0);
  const [abs, setAbs] = useState(0);
  const [ord, setOrd] = useState(0);
  const [rad, setRad] = useState(0);
  const [res, setRes] = useState(0);
  const [series, setSeries] = useState({
    seria1: [],
    seria2: [],
    seria3: [],
    seria4: [],
    seria5: [],
    intSeria1: [],
    intSeria2: [],
    intSeria3: [],
  });
  const [massOfExpNum] = useState([10 ** 4, 10 ** 5, 10 ** 6, 10 ** 7, 10 ** 8]);

  function findPi(abs, ord, rad, expNum) {
    const xmin = abs - rad;
    const xmax = abs + rad;
    const ymin = ord - rad;
    const ymax = ord + rad;
    let m = 0;
    let x, y;

    for (let i = 0; i < expNum; i++) {
      x = (xmax - xmin) * Math.random() + xmin;
      y = (ymax - ymin) * Math.random() + ymin;
      if ((x - abs) ** 2 + (y - ord) ** 2 < rad ** 2) {
        m++;
      }
    }
    return (m / expNum) * 4;
  }

  function findIntegral(a, b, expNum) {
    const xmin = a;
    const xmax = b;
    const ymin = 0;
    const ymax = b ** 3 + 1; // Максимальное значение функции на интервале (f(b) = b^3 + 1)
    let m = 0;
    let x, y;
  
    for (let i = 0; i < expNum; i++) {
      // Генерация случайных x и y в пределах области
      x = (xmax - xmin) * Math.random() + xmin;
      y = (ymax - ymin) * Math.random() + ymin;
      
      // Проверка попадания точки под график функции
      if ((x ** 3 + 1) > y) {
        m++;
      }
    }
  
    // Масштабируем результат на ymax вместо f(b)
    return (m / expNum) * (b - a) * ymax;
  }

  const handleSetRes = () => {
    setRes(findPi(abs, ord, rad, expNum));
  };

  const handleFindSeria = (seriaKey) => {
    const results = massOfExpNum.map((element) => findPi(abs, ord, rad, element));
    setSeries((prevState) => ({
      ...prevState,
      [seriaKey]: results,
    }));
  };

  const handleFindIntegralSeria = (seriaKey) => {
    const a = 0;
    const b = 2;
    const results = massOfExpNum.map((element) => findIntegral(a, b, element));
    setSeries((prevState) => ({
      ...prevState,
      [seriaKey]: results,
    }));
  };

  function calculateAverage(series, seriesKeys) {
    const numberOfSeries = seriesKeys.length;
    const lengthOfSeries = series[seriesKeys[0]].length;
    const averages = new Array(lengthOfSeries).fill(0);

    for (let i = 0; i < lengthOfSeries; i++) {
      let sum = 0;
      for (let key of seriesKeys) {
        sum += series[key][i];
      }
      averages[i] = sum / numberOfSeries;
    }

    return averages;
  }

  function calculateError(averageResults, trueValue) {
    return averageResults.map((result) => Math.abs((result - trueValue) / trueValue));
  }

  const [averagePiResults, setAveragePiResults] = useState([]);
  const [piErrorResults, setPiErrorResults] = useState([]);
  const [averageIntegralResults, setAverageIntegralResults] = useState([]);
  const [integralErrorResults, setIntegralErrorResults] = useState([]);

  const handleCalculatePiAverage = () => {
    const piSeriesKeys = ['seria1', 'seria2', 'seria3', 'seria4', 'seria5'];
    const avg = calculateAverage(series, piSeriesKeys);
    setAveragePiResults(avg);
    const errors = calculateError(avg, Math.PI);
    setPiErrorResults(errors);
  };

  const handleCalculateIntegralAverage = () => {
    const integralSeriesKeys = ['intSeria1', 'intSeria2', 'intSeria3'];
    const avg = calculateAverage(series, integralSeriesKeys);
    setAverageIntegralResults(avg);
    const errors = calculateError(avg, 6); // Истинное значение интеграла равно 6
    setIntegralErrorResults(errors);
  };
  const teorText = <div>
    <p>
    Основой статистического эксперимента является метод статистических
испытаний (метод Монте-Карло). Последний предполагает генерацию
случайных чисел, распределенных по заданному закону. Для генерации
используются программы, позволяющие воспроизвести псевдослучайные
последовательности, имеющие равномерное распределение в интервале (0,1).
Результат испытаний ставится в зависимость от полученного значения
случайного числа.
    </p>
    <p>
    Для определения значения числа π  
рассмотрим квадрат, описанный вокруг окружности с известными
координатами центра 0x , 0y и заданным радиусом 0r . Центр квадрата
совпадает с центром окружности, а длина ребра равна значению 02r.Будем генерировать случайные точки таким образом, чтобы они равномерно
появлялись внутри квадрата. Вероятность того, что точка внутри квадрата, координаты которой получены
с помощью генератора случайных чисел, попадет внутрь окружности, равна
отношению площади круга - πr^2 к площади квадрата -4*r^2, то есть π/4
    </p>
  </div>
  const solutAlg = <div>
    <ol style={{listStyle: "inside"}}>
      <li>обнуляем m - число положительных испытаний</li>
      <li>организуем цикл по числу экспериментов</li>
      <li>инициализируем генератор случайных чисел, получаем случайное число p</li>
      <li>определяем случайное число xp в интервале (xmax - xmin)</li>
      <li>инициализируем генератор случайных чисел, получаем случайное число p</li>
      <li>определяем случайное число yp в интервале (ymax - ymin)</li>
      <li>определяем: находится ли точка с координатами (,)xpyp внутри круга. Если находится, то число m положительных испытаний увеличиваем на
      единицу.</li>
      <li>определяем площадь круга по формуле - S = S * m/n, где m- число положительных исходов, n – общее число экспериментов, или число π по формуле π = 4 * m/n</li>
      <li>проводим обработку результатов статистического эксперимента: определяем средне значение числа π и среднее квадратическое отклонение.</li>
    </ol>
  </div>
  return (
    <div className='App'>
      <h1>Нахождение числа PI</h1>
      <Tooltip text={teorText} buttonText="Теории блок" />
      <Tooltip text={solutAlg} buttonText="Алгоритм решения" />
      <div>
        <p style={{marginTop: '15px' }}>Координаты центра окружности:</p>
        <div className='coords'>
          <FindPiInput placeholder='X0' onChange={(e) => setAbs(Number(e.target.value))} />
          <FindPiInput placeholder='Y0' onChange={(e) => setOrd(Number(e.target.value))} />
        </div>
        <p>Параметры окружности:</p>
        <div className='coords'>
          <FindPiInput placeholder='Радиус окружности' onChange={(e) => setRad(Number(e.target.value))} />
          <FindPiInput placeholder='Число экспериментов' onChange={(e) => setExpNum(Number(e.target.value))} />
        </div>
      </div>
      <FindPiButton style={{ marginLeft: 'auto', marginRight: 'auto' }} onClick={handleSetRes}>
        Найти Pi
      </FindPiButton>
      <p>{res.toFixed(5)}</p>

      {/* Компоненты серий для Pi */}
      <PiSeries
        title='Seria1'
        massOfExpNum={massOfExpNum}
        onFindSeries={() => handleFindSeria('seria1')}
        results={series.seria1}
        trueValue={Math.PI}
      />
      <PiSeries
        title='Seria2'
        massOfExpNum={massOfExpNum}
        onFindSeries={() => handleFindSeria('seria2')}
        results={series.seria2}
        trueValue={Math.PI}
      />
      <PiSeries
        title='Seria3'
        massOfExpNum={massOfExpNum}
        onFindSeries={() => handleFindSeria('seria3')}
        results={series.seria3}
        trueValue={Math.PI}
      />
      <PiSeries
        title='Seria4'
        massOfExpNum={massOfExpNum}
        onFindSeries={() => handleFindSeria('seria4')}
        results={series.seria4}
        trueValue={Math.PI}
      />
      <PiSeries
        title='Seria5'
        massOfExpNum={massOfExpNum}
        onFindSeries={() => handleFindSeria('seria5')}
        results={series.seria5}
        trueValue={Math.PI}
      />

      {/* Компоненты серий для интеграла */}
      <PiSeries
        title='IntSeria1'
        massOfExpNum={massOfExpNum}
        onFindSeries={() => handleFindIntegralSeria('intSeria1')}
        results={series.intSeria1}
        trueValue={6}
      />
      <PiSeries
        title='IntSeria2'
        massOfExpNum={massOfExpNum}
        onFindSeries={() => handleFindIntegralSeria('intSeria2')}
        results={series.intSeria2}
        trueValue={6}
      />
      <PiSeries
        title='IntSeria3'
        massOfExpNum={massOfExpNum}
        onFindSeries={() => handleFindIntegralSeria('intSeria3')}
        results={series.intSeria3}
        trueValue={6}
      />
      <FindPiButton onClick={handleCalculatePiAverage}>Вычислить среднее для Pi</FindPiButton>
      <FindPiButton onClick={handleCalculateIntegralAverage}>Вычислить среднее для интеграла</FindPiButton>

      {/* Таблица результатов для Pi */}
      {averagePiResults.length > 0 && (
        <div>
          <h2>Средние результаты для Pi</h2>
          <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {massOfExpNum.map((exp, i) => (
                  <th key={i} style={{ border: '1px solid black' }}>{`10^${Math.log10(exp)}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {averagePiResults.map((elem, idx) => (
                  <td key={idx} style={{ border: '1px solid black' }}>
                    {elem.toFixed(5)}
                  </td>
                ))}
              </tr>
              <tr>
                {piErrorResults.map((error, idx) => (
                  <td key={idx} style={{ border: '1px solid black' }}>
                    {error.toFixed(5)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Таблица результатов для интеграла */}
      {averageIntegralResults.length > 0 && (
        <div>
          <h2>Средние результаты для интеграла</h2>
          <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {massOfExpNum.map((exp, i) => (
                  <th key={i} style={{ border: '1px solid black' }}>{`10^${Math.log10(exp)}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {averageIntegralResults.map((elem, idx) => (
                  <td key={idx} style={{ border: '1px solid black' }}>
                    {elem.toFixed(5)}
                  </td>
                ))}
              </tr>
              <tr>
                {integralErrorResults.map((error, idx) => (
                  <td key={idx} style={{ border: '1px solid black' }}>
                    {error.toFixed(5)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
