# 🎄 Advent of Code 2021 - day 21 🎄
[Original problem](https://adventofcode.com/2021/day/21)

<article class="day-desc"><h2>--- Day 21: Dirac Dice ---</h2><p>There's not much to do as you slowly descend to the bottom of the ocean. The submarine computer <span title="A STRANGE GAME.">challenges you to a nice game</span> of <strong>Dirac Dice</strong>.</p>
<p>This game consists of a single <a href="https://en.wikipedia.org/wiki/Dice" target="_blank">die</a>, two <a href="https://en.wikipedia.org/wiki/Glossary_of_board_games#piece" target="_blank">pawns</a>, and a game board with a circular track containing ten spaces marked <code>1</code> through <code>10</code> clockwise. Each player's <strong>starting space</strong> is chosen randomly (your puzzle input). Player 1 goes first.</p>
<p>Players take turns moving. On each player's turn, the player rolls the die <strong>three times</strong> and adds up the results. Then, the player moves their pawn that many times <strong>forward</strong> around the track (that is, moving clockwise on spaces in order of increasing value, wrapping back around to <code>1</code> after <code>10</code>). So, if a player is on space <code>7</code> and they roll <code>2</code>, <code>2</code>, and <code>1</code>, they would move forward 5 times, to spaces <code>8</code>, <code>9</code>, <code>10</code>, <code>1</code>, and finally stopping on <code>2</code>.</p>
<p>After each player moves, they increase their <strong>score</strong> by the value of the space their pawn stopped on. Players' scores start at <code>0</code>. So, if the first player starts on space <code>7</code> and rolls a total of <code>5</code>, they would stop on space <code>2</code> and add <code>2</code> to their score (for a total score of <code>2</code>). The game immediately ends as a win for any player whose score reaches <em>at least <code>1000</code></em>.</p>
<p>Since the first game is a practice game, the submarine opens a compartment labeled <strong>deterministic dice</strong> and a 100-sided die falls out. This die always rolls <code>1</code> first, then <code>2</code>, then <code>3</code>, and so on up to <code>100</code>, after which it starts over at <code>1</code> again. Play using this die.</p>
<p>For example, given these starting positions:</p>
<pre><code>Player 1 starting position: 4
Player 2 starting position: 8
</code></pre>
<p>This is how the game would go:</p>
<ul>
<li>Player 1 rolls <code>1</code>+<code>2</code>+<code>3</code> and moves to space <code>10</code> for a total score of <code>10</code>.</li>
<li>Player 2 rolls <code>4</code>+<code>5</code>+<code>6</code> and moves to space <code>3</code> for a total score of <code>3</code>.</li>
<li>Player 1 rolls <code>7</code>+<code>8</code>+<code>9</code> and moves to space <code>4</code> for a total score of <code>14</code>.</li>
<li>Player 2 rolls <code>10</code>+<code>11</code>+<code>12</code> and moves to space <code>6</code> for a total score of <code>9</code>.</li>
<li>Player 1 rolls <code>13</code>+<code>14</code>+<code>15</code> and moves to space <code>6</code> for a total score of <code>20</code>.</li>
<li>Player 2 rolls <code>16</code>+<code>17</code>+<code>18</code> and moves to space <code>7</code> for a total score of <code>16</code>.</li>
<li>Player 1 rolls <code>19</code>+<code>20</code>+<code>21</code> and moves to space <code>6</code> for a total score of <code>26</code>.</li>
<li>Player 2 rolls <code>22</code>+<code>23</code>+<code>24</code> and moves to space <code>6</code> for a total score of <code>22</code>.</li>
</ul>
<p>...after many turns...</p>
<ul>
<li>Player 2 rolls <code>82</code>+<code>83</code>+<code>84</code> and moves to space <code>6</code> for a total score of <code>742</code>.</li>
<li>Player 1 rolls <code>85</code>+<code>86</code>+<code>87</code> and moves to space <code>4</code> for a total score of <code>990</code>.</li>
<li>Player 2 rolls <code>88</code>+<code>89</code>+<code>90</code> and moves to space <code>3</code> for a total score of <code>745</code>.</li>
<li>Player 1 rolls <code>91</code>+<code>92</code>+<code>93</code> and moves to space <code>10</code> for a final score, <code>1000</code>.</li>
</ul>
<p>Since player 1 has at least <code>1000</code> points, player 1 wins and the game ends. At this point, the losing player had <code>745</code> points and the die had been rolled a total of <code>993</code> times; <code>745 * 993 = <strong>739785</strong></code>.</p>
<p>Play a practice game using the deterministic 100-sided die. The moment either player wins, <strong>what do you get if you multiply the score of the losing player by the number of times the die was rolled during the game?</strong></p>
</article>

<article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>Now that you're warmed up, it's time to play the real game.</p>
<p>A second compartment opens, this time labeled <strong>Dirac dice</strong>. Out of it falls a single three-sided die.</p>
<p>As you experiment with the die, you feel a little strange. An informational brochure in the compartment explains that this is a <strong>quantum die</strong>: when you roll it, the universe <strong>splits into multiple copies</strong>, one copy for each possible outcome of the die. In this case, rolling the die always splits the universe into <strong>three copies</strong>: one where the outcome of the roll was <code>1</code>, one where it was <code>2</code>, and one where it was <code>3</code>.</p>
<p>The game is played the same as before, although to prevent things from getting too far out of hand, the game now ends when either player's score reaches at least <code><strong>21</strong></code>.</p>
<p>Using the same starting positions as in the example above, player 1 wins in <code><strong>444356092776315</strong></code> universes, while player 2 merely wins in <code>341960390180808</code> universes.</p>
<p>Using your given starting positions, determine every possible outcome. <strong>Find the player that wins in more universes; in how many universes does that player win?</strong></p>
</article>
