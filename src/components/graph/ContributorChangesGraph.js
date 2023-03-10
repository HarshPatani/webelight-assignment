import { HighchartsReact } from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import moment from "moment";
import { useSelector } from "react-redux";

const ContributorChangesGraph = ({ user, repo }) => {
  const graphType = useSelector((store) => store.changeGraph);
  const [contributorChanges, setContributorChanges] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let response;
        response = await fetch(
          `https://api.github.com/repos/${user}/${repo}/stats/contributors`
        );

        const json = await response.json();
        if (Array.isArray(json)) {
          setContributorChanges(json);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user, repo]);

  const weeks = contributorChanges[0]?.weeks;

  const setPlotData = (item) => {
    let dataArray;
    if (graphType === "Additions") {
      dataArray = item.weeks?.map((week) => week.a);
    } else if (graphType === "Deletions") {
      dataArray = item.weeks?.map((week) => {
        if (week.d < 0) {
          return -week.d;
        } else {
          return week.d;
        }
      });
    } else if (graphType === "Commits") {
      dataArray = item.weeks?.map((week) => week.c);
    }
    return dataArray;
  };

  const setxAxisLabels = () => {
    let labels;
    if (Array.isArray(contributorChanges)) {
      labels = weeks?.map((item) => moment.unix(item.w).format("DD/MM/YYYY"));
    } else {
      labels = [];
    }
    return labels;
  };

  //   const setContributorData = () => {
  //     if (Array.isArray(contributorChanges)) {
  //       contributorChanges?.map((item) => {
  //         return {
  //           name: item.author.login,
  //           type: "line",
  //           data: setPlotData(item),
  //         };
  //       });
  //     }
  //   };

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Contributor Changes",
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

    series: contributorChanges?.map((item) => {
      return {
        name: item.author.login,
        type: "line",
        data: setPlotData(item),
      };
    }),
  };
  return (
    <div>
      {contributorChanges.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <h1>No Contributors</h1>
      )}
    </div>
  );
};

export default ContributorChangesGraph;
