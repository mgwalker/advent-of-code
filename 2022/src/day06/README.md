# 🎄 Advent of Code 2022 - day 6 🎄
[Original problem](https://adventofcode.com/2022/day/6)

<article class="day-desc"><h2>--- Day 6: Tuning Trouble ---</h2><p>The preparations are finally complete; you and the Elves leave camp on foot and begin to make your way toward the <strong>star</strong> fruit grove.</p>
<p>As you move through the dense undergrowth, one of the Elves gives you a handheld <strong>device</strong>. He says that it has many fancy features, but the most important one to set up right now is the <strong>communication system</strong>.</p>
<p>However, because he's heard you have <a href="/2016/day/6">significant</a> <a href="/2016/day/25">experience</a> <a href="/2019/day/7">dealing</a> <a href="/2019/day/9">with</a> <a href="/2019/day/16">signal-based</a> <a href="/2021/day/25">systems</a>, he convinced the other Elves that it would be okay to give you their one malfunctioning device - surely you'll have no problem fixing it.</p>
<p>As if inspired by comedic timing, the device emits a few <span title="The magic smoke, on the other hand, seems to be contained... FOR NOW!">colorful sparks</span>.</p>
<p>To be able to communicate with the Elves, the device needs to <strong>lock on to their signal</strong>. The signal is a series of seemingly-random characters that the device receives one at a time.</p>
<p>To fix the communication system, you need to add a subroutine to the device that detects a <strong>start-of-packet marker</strong> in the datastream. In the protocol being used by the Elves, the start of a packet is indicated by a sequence of <strong>four characters that are all different</strong>.</p>
<p>The device will send your subroutine a datastream buffer (your puzzle input); your subroutine needs to identify the first position where the four most recently received characters were all different. Specifically, it needs to report the number of characters from the beginning of the buffer to the end of the first such four-character marker.</p>
<p>For example, suppose you receive the following datastream buffer:</p>
<pre><code>mjqjpqmgbljsphdztnvjfqwrcgsmlb</code></pre>
<p>After the first three characters (<code>mjq</code>) have been received, there haven't been enough characters received yet to find the marker. The first time a marker could occur is after the fourth character is received, making the most recent four characters <code>mjqj</code>. Because <code>j</code> is repeated, this isn't a marker.</p>
<p>The first time a marker appears is after the <strong>seventh</strong> character arrives. Once it does, the last four characters received are <code>jpqm</code>, which are all different. In this case, your subroutine should report the value <code><strong>7</strong></code>, because the first start-of-packet marker is complete after 7 characters have been processed.</p>
<p>Here are a few more examples:</p>
<ul>
<li><code>bvwbjplbgvbhsrlpgdmjqwftvncz</code>: first marker after character <code><strong>5</strong></code></li>
<li><code>nppdvjthqldpwncqszvftbrmjlhg</code>: first marker after character <code><strong>6</strong></code></li>
<li><code>nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg</code>: first marker after character <code><strong>10</strong></code></li>
<li><code>zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw</code>: first marker after character <code><strong>11</strong></code></li>
</ul>
<p><strong>How many characters need to be processed before the first start-of-packet marker is detected?</strong></p>
</article>

<article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>Your device's communication system is correctly detecting packets, but still isn't working. It looks like it also needs to look for <strong>messages</strong>.</p>
<p>A <strong>start-of-message marker</strong> is just like a start-of-packet marker, except it consists of <strong>14 distinct characters</strong> rather than 4.</p>
<p>Here are the first positions of start-of-message markers for all of the above examples:</p>
<ul>
<li><code>mjqjpqmgbljsphdztnvjfqwrcgsmlb</code>: first marker after character <code><strong>19</strong></code></li>
<li><code>bvwbjplbgvbhsrlpgdmjqwftvncz</code>: first marker after character <code><strong>23</strong></code></li>
<li><code>nppdvjthqldpwncqszvftbrmjlhg</code>: first marker after character <code><strong>23</strong></code></li>
<li><code>nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg</code>: first marker after character <code><strong>29</strong></code></li>
<li><code>zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw</code>: first marker after character <code><strong>26</strong></code></li>
</ul>
<p><strong>How many characters need to be processed before the first start-of-message marker is detected?</strong></p>
</article>
