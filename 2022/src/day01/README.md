# 🎄 Advent of Code 2022 - day 1 🎄
[Original problem](https://adventofcode.com/2022/day/1)

<article class="day-desc"><h2>--- Day 1: Calorie Counting ---</h2><p>Santa's reindeer typically eat regular reindeer food, but they need a lot of <a href="/2018/day/25">magical energy</a> to deliver presents on Christmas. For that, their favorite snack is a special type of <strong>star</strong> fruit that only grows deep in the jungle. The Elves have brought you on their annual expedition to the grove where the fruit grows.</p>
<p>To supply enough magical energy, the expedition needs to retrieve a minimum of <strong>fifty stars</strong> by December 25th. Although the Elves assure you that the grove has plenty of fruit, you decide to grab any fruit you see along the way, just in case.</p>
<p>Collect stars by solving puzzles.  Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first.  Each puzzle grants <strong>one star</strong>. Good luck!</p>
<p>The jungle must be too overgrown and difficult to navigate in vehicles or access from the air; the Elves' expedition traditionally goes on foot. As your boats approach land, the Elves begin taking inventory of their supplies. One important consideration is food - in particular, the number of <strong>Calories</strong> each Elf is carrying (your puzzle input).</p>
<p>The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, <span title="By &quot;etc&quot;, you're pretty sure they just mean &quot;more snacks&quot;.">etc.</span> that they've brought with them, one item per line. Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line.</p>
<p>For example, suppose the Elves finish writing their items' Calories and end up with the following list:</p>
<pre><code>1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
</code></pre>
<p>This list represents the Calories of the food carried by five Elves:</p>
<ul>
<li>The first Elf is carrying food with <code>1000</code>, <code>2000</code>, and <code>3000</code> Calories, a total of <code><strong>6000</strong></code> Calories.</li>
<li>The second Elf is carrying one food item with <code><strong>4000</strong></code> Calories.</li>
<li>The third Elf is carrying food with <code>5000</code> and <code>6000</code> Calories, a total of <code><strong>11000</strong></code> Calories.</li>
<li>The fourth Elf is carrying food with <code>7000</code>, <code>8000</code>, and <code>9000</code> Calories, a total of <code><strong>24000</strong></code> Calories.</li>
<li>The fifth Elf is carrying one food item with <code><strong>10000</strong></code> Calories.</li>
</ul>
<p>In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the <strong>most</strong> Calories. In the example above, this is <em><code>24000</code></em> (carried by the fourth Elf).</p>
<p>Find the Elf carrying the most Calories. <strong>How many total Calories is that Elf carrying?</strong></p>
</article>

<article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually <strong>run out of snacks</strong>.</p>
<p>To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the <strong>top three</strong> Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.</p>
<p>In the example above, the top three Elves are the fourth Elf (with <code>24000</code> Calories), then the third Elf (with <code>11000</code> Calories), then the fifth Elf (with <code>10000</codE> Calories). The sum of the Calories carried by these three elves is <code><strong>45000</strong></code>.</p>
<p>Find the top three Elves carrying the most Calories. <strong>How many Calories are those Elves carrying in total?</strong></p>
</article>
