# 🎄 Advent of Code 2022 - day 2 🎄
[Original problem](https://adventofcode.com/2022/day/2)

<article class="day-desc"><h2>--- Day 2: Rock Paper Scissors ---</h2><p>The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, a giant <a href="https://en.wikipedia.org/wiki/Rock_paper_scissors" target="_blank">Rock Paper Scissors</a> tournament is already in progress.</p>
<p>Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.</p>
<p>Appreciative of your help yesterday, one Elf gives you an <strong>encrypted strategy guide</strong> (your puzzle input) that they say will be sure to help you win. "The first column is what your opponent is going to play: <code>A</code> for Rock, <code>B</code> for Paper, and <code>C</code> for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent.</p>
<p>The second column, <span title="Why do you keep guessing?!">you reason</span>, must be what you should play in response: <code>X</code> for Rock, <code>Y</code> for Paper, and <code>Z</code> for Scissors. Winning every time would be suspicious, so the responses must have been carefully chosen.</p>
<p>The winner of the whole tournament is the player with the highest score. Your <strong>total score</strong> is the sum of your scores for each round. The score for a single round is the score for the <strong>shape you selected</strong> (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the <strong>outcome of the round</strong> (0 if you lost, 3 if the round was a draw, and 6 if you won).</p>
<p>Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get if you were to follow the strategy guide.</p>
<p>For example, suppose you were given the following strategy guide:</p>
<pre><code>A Y
B X
C Z
</code></pre>
<p>This strategy guide predicts and recommends the following:</p>
<ul>
<li>In the first round, your opponent will choose Rock (<code>A</code>), and you should choose Paper (<code>Y</code>). This ends in a win for you with a score of <strong>8</strong> (2 because you chose Paper + 6 because you won).</li>
<li>In the second round, your opponent will choose Paper (<code>B</code>), and you should choose Rock (<code>X</code>). This ends in a loss for you with a score of <strong>1</strong> (1 + 0).</li>
<li>The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = <strong>6</strong>.</li>
</ul>
<p>In this example, if you were to follow the strategy guide, you would get a total score of <code><strong>15</strong></code> (8 + 1 + 6).</p>
<p><strong>What would your total score be if everything goes exactly according to your strategy guide?</strong></p>
</article>

<article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: <code>X</code> means you need to lose, <code>Y</code> means you need to end the round in a draw, and <code>Z</code> means you need to win. Good luck!"</p>
<p>The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:</p>
<ul>
<li>In the first round, your opponent will choose Rock (<code>A</code>), and you need the round to end in a draw (<code>Y</code>), so you also choose Rock. This gives you a score of 1 + 3 = <strong>4</strong>.</li>
<li>In the second round, your opponent will choose Paper (<code>B</code>), and you choose Rock so you lose (<code>X</code>) with a score of 1 + 0 = <strong>1</strong>.</li>
<li>In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = <strong>7</strong>.</li>
</ul>
<p>Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of <code><strong>12</strong></code>.</p>
<p>Following the Elf's instructions for the second column, <strong>what would your total score be if everything goes exactly according to your strategy guide?</strong></p>
</article>
