import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { apiRequsetLtvDiffChartData } from "./getLtvDiffChartData";
import { kFormatter, dataProcessing, checkMaxFunc } from "../../utils";

const LtvDiffChartComponent = () => {
  const [echartOption, setEchartOption] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [maxData, setMaxData] = useState(0);

  //api 요청하여 데이터 저장하기
  useEffect(() => {
    apiRequsetLtvDiffChartData()
      .then((res) => {
        console.log(res);
        setApiData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // api 데이터가 있는지 확인하는 함수 (Loading 체크)
  const dataStateManage = () => {
    if (apiData.length !== 0) {
      setIsLoading(true);
    }
  };

  //dataStateManage apiData의 상태가 바뀌면 함수를 실행시켜주는 useEffect
  useEffect(() => {
    dataStateManage();
  }, [apiData]);

  //api가 불러오고 max데이터를 추출하는 함수
  useEffect(() => {
    console.log(isLoading);
    if (isLoading) {
      setMaxData(checkMaxFunc(dataProcessing(apiData)));
    }
  }, [isLoading, apiData]);

  useEffect(() => {
    if (isLoading) {
      const Xlabel = apiData.data.dimensions;
      const Ylabel = apiData.index;

      // 데이터 가공
      const data = dataProcessing(apiData);

      setEchartOption({
        tooltip: {
          position: "top",
        },
        grid: {
          height: "85%",
          top: "10%",
        },
        xAxis: {
          type: "category",
          data: Xlabel,
          position: "top",
          name: "경과월 수",
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: "category",
          data: Ylabel,
          name: "첫 구매 월",
          splitArea: {
            show: true,
          },
          inverse: true,
        },
        visualMap: {
          min: 0,
          max: maxData,
          calculable: true,
          orient: "horizontal",
          top: "-2%",
          right: "0%",
          inRange: {
            color: ["#ffffff", "#2881b9"],
          },
        },
        series: [
          {
            name: "Punch Card",
            type: "heatmap",
            data: data,
            label: {
              show: true,
              formatter: (params) => kFormatter(params.value[2]),
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    }
  }, [apiData, isLoading, maxData]);

  return <ReactECharts option={echartOption} />;
};

export default LtvDiffChartComponent;
