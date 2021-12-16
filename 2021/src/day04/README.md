# 🎄 Advent of Code 2021 - day 4 🎄
Original problem](https://adventofcode.com/2021/day/4)

<article class="day-desc"><h2>--- Day 4: Giant Squid ---</h2><p>You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you <strong>can</strong> see, however, is a giant squid that has attached itself to the outside of your submarine.</p>
<p>Maybe it wants to play <a href="https://en.wikipedia.org/wiki/Bingo_(American_version)" target="_blank">bingo</a>?</p>
<p>Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is <strong>wins</strong>. (Diagonals don't count.)</p>
<p>The submarine has a <strong>bingo subsystem</strong> to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:</p>
<pre><code>7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
</code></pre>
<p>After the first five numbers are drawn (<code>7</code>, <code>4</code>, <code>9</code>, <code>5</code>, and <code>11</code>), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):</p>
<pre><code>22 13 17 <strong>4</strong>
 8  2 23  <strong>9</strong> 19
21  <strong>7</strong> 25 23        18  8 23 26 20
 6 10  3 18  <strong>5</strong>
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  <strong>7</strong>
</code></pre>
<p>After the next six numbers are drawn (<code>17</code>, <code>23</code>, <code>2</code>, <code>0</code>, <code>14</code>, and <code>21</code>), there are still no winners:</p>
<pre><code>22 13 <strong>4</strong>
 8  <strong>9</strong> 19
<strong>23</strong> 26 20
 6 10  3 18  <strong>5</strong>
 1 12 20 15 19        <strong>7</strong>
</code></pre>
<p>Finally, <code>24</code> is drawn:</p>
<pre><code>22 13 <strong>4</strong>
 8  <strong>9</strong> 19
<strong>23</strong> 26 20
 6 10  3 18  <strong>5</strong>
 1 12 20 15 19        <strong>7</strong>
</code></pre>
<p>At this point, the third board <strong>14 21 17 24  4</strong></code>).</p>
<p>The <strong>4512</strong></code>.</p>
<p>To guarantee victory against the giant squid, figure out which board will win first. <strong>What will your final score be if you choose that board?</strong></p>
</article>

<article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>On the other hand, it might be wise to try a different strategy: <span title="That's 'cuz a submarine don't pull things' antennas out of their sockets when they lose. Giant squid are known to do that.">let the giant squid win</span>.</p>
<p>You aren't sure how many bingo boards a giant squid could play at once, so rather than waste time counting its arms, the safe thing to do is to <strong>figure out which board will win last</strong> and choose that one. That way, no matter which boards it picks, it will win for sure.</p>
<p>In the above example, the second board is the last to win, which happens after <code>13</code> is eventually called and its middle column is completely marked. If you were to keep playing until this point, the second board would have a sum of unmarked numbers equal to <code>148</code> for a final score of <code>148 * 13 = <strong>1924</strong></code>.</p>
<p>Figure out which board will win last. <strong>Once it wins, what would its final score be?</strong></p>
</article>
