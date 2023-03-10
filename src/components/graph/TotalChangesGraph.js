import React from "react";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment/moment";
import { useSelector } from "react-redux";

const TotalChangesGraph = ({ user, repo }) => {
  const graphType = useSelector((store) => store.changeGraph);
  const [totalChanges, setTotalchanges] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let response;
        if (graphType !== "Commits") {
          response = await fetch(
            `https://api.github.com/repos/${user}/${repo}/stats/code_frequency`
          );
        } else {
          response = await fetch(
            `https://api.github.com/repos/${user}/${repo}/stats/commit_activity`
          );
        }

        const json = await response.json();
        if (Array.isArray(json)) {
          setTotalchanges(json);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user, repo, graphType]);

  const setPLotData = () => {
    if (Array.isArray(totalChanges)) {
      let dataArray;
      if (graphType === "Additions") {
        dataArray = totalChanges?.map((item) => item[1]);
      } else if (graphType === "Deletions") {
        dataArray = totalChanges?.map((item) => {
          if (item[2] < 0) {
            return -item[2];
          } else {
            return item[2];
          }
        });
      } else if (graphType === "Commits") {
        dataArray = totalChanges?.map((item) => item.total);
      }
      return dataArray;
    }
  };

  const setxAxisLabels = () => {
    let labels = [];
    if (graphType === "Commits") {
      labels = totalChanges?.map((item) =>
        moment.unix(item.week).format("DD/MM/YYYY")
      );
    } else {
      labels = totalChanges?.map((item) =>
        moment.unix(item[0]).format("DD/MM/YYYY")
      );
    }
    return labels;
  };

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Total Changes",
    },

    xAxis: {
      categories: setxAxisLabels(),
      title: {
        text: "Week Start",
      },
    },
    yAxis: {
      title: {
        text: graphType,
      },
    },

    series: [
      {
        name: graphType,
        type: "line",
        data: setPLotData(),
      },
    ],
  };
  return (
    <div>
      {totalChanges.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <h1>No Data</h1>
      )}
    </div>
  );
};

export default TotalChangesGraph;
