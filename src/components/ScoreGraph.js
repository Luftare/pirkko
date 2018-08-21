import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { VictoryChart, VictoryLine, VictoryLegend, VictoryAxis } from 'victory';
import { theme } from '../styles';

@inject('gameStore')
@observer
class ScoreGraph extends Component {
  render() {
    const { gameStore } = this.props;
    const { pars } = gameStore;
    const playersChartData = gameStore.rankedPlayers.map((player, i) => ({
      name: player.name,
      data: player.scores.filter((s) => s && s).map((_, j) => {
        const par = pars[j];
        const sumOfParsFromStart = pars
          .slice(0, j)
          .reduce((sum, par) => sum + par, 0);
        const sumOfThrowsFromStart = player.scores
          .slice(0, j)
          .reduce((sum, s) => sum + s, 0);
        if (
          sumOfParsFromStart !== undefined &&
          sumOfThrowsFromStart !== undefined
        ) {
          return {
            x: j + 1,
            y: sumOfThrowsFromStart - sumOfParsFromStart
          };
        } else {
          return { x: j + 1, y: null };
        }
      })
    }));
    return (
      <VictoryChart
        domainPadding={{ y: 40, x: 0 }}
        domain={{ x: [1, pars.length] }}
        padding={50}
      >
        <VictoryAxis
          label="Tee"
          tickValues={[...Array(pars.length)].map((_, i) => i + 1)}
        />
        <VictoryLegend
          x={125}
          y={50}
          orientation="horizontal"
          symbolSpacer={5}
          gutter={20}
          data={playersChartData.map((playerData, i) => ({
            name: playerData.name,
            symbol: { fill: theme.rankedColors(i) }
          }))}
        />
        {playersChartData.map((playerData, i) => (
          <VictoryLine
            key={i}
            data={playerData.data}
            style={{
              data: {
                stroke: theme.rankedColors(i)
              }
            }}
          />
        ))}
      </VictoryChart>
    );
  }
}

export default ScoreGraph;
