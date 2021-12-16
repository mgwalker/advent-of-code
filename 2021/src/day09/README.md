# 🎄 Advent of Code 2021 - day 9 🎄

[Original problem](https://adventofcode.com/2021/day/9)

<article class="day-desc"><h2>--- Day 9: Smoke Basin ---</h2><p>These caves seem to be <a href="https://en.wikipedia.org/wiki/Lava_tube" target="_blank">lava tubes</a>. Parts are even still volcanically active; small hydrothermal vents release smoke into the caves that slowly <span title="This was originally going to be a puzzle about watersheds, but we're already under water.">settles like rain</span>.</p>
<p>If you can model how the smoke flows through the caves, you might be able to avoid it and be that much safer. The submarine generates a heightmap of the floor of the nearby caves for you (your puzzle input).</p>
<p>Smoke flows to the lowest point of the area it's in. For example, consider the following heightmap:</p>
<pre><code>2<strong>0</strong>
3987894921
98<strong>5</strong>6789892
8767896789
989996<strong>5</strong>678
</code></pre>
<p>Each number corresponds to the height of a particular location, where <code>9</code> is the highest and <code>0</code> is the lowest a location can be.</p>
<p>Your first goal is to find the <strong>low points</strong> - the locations that are lower than any of its adjacent locations. Most locations have four adjacent locations (up, down, left, and right); locations on the edge or corner of the map have three or two adjacent locations, respectively. (Diagonal locations do not count as adjacent.)</p>
<p>In the above example, there are <strong>four</strong> low points, all highlighted: two are in the first row (a <code>1</code> and a <code>0</code>), one is in the third row (a <code>5</code>), and one is in the bottom row (also a <code>5</code>). All other locations on the heightmap have some lower adjacent location, and so are not low points.</p>
<p>The <strong>15</strong></code>.</p>
<p>Find all of the low points on your heightmap. <strong>What is the sum of the risk levels of all low points on your heightmap?</strong></p>
</article>

<article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>Next, you need to find the largest basins so you know what areas are most important to avoid.</p>
<p>A <strong>basin</strong> is all locations that eventually flow downward to a single low point. Therefore, every low point has a basin, although some basins are very small. Locations of height <code>9</code> do not count as being in any basin, and all other locations will always be part of exactly one basin.</p>
<p>The <strong>size</strong> of a basin is the number of locations within the basin, including the low point. The example above has four basins.</p>
<p>The top-left basin, size <code>3</code>:</p>
<pre><code><strong>21</strong>99943210
<strong>3</strong>987894921
9856789892
8767896789
9899965678
</code></pre>
<p>The top-right basin, size <code>9</code>:</p>
<pre><code>21999<strong>43210</strong>
398789<strong>21</strong>
985678989<strong>2</strong>
8767896789
9899965678
</code></pre>
<p>The middle basin, size <code>14</code>:</p>
<pre><code>2199943210
39<strong>878</strong>94921
9<strong>85678</strong>9892
<strong>87678</strong>96789
9<strong>8</strong>99965678
</code></pre>
<p>The bottom-right basin, size <code>9</code>:</p>
<pre><code>2199943210
3987894921
9856789<strong>8</strong>92
876789<strong>678</strong>9
98999<strong>65678</strong>
</code></pre>
<p>Find the three largest basins and multiply their sizes together. In the above example, this is <code>9 * 14 * 9 = <strong>1134</strong></code>.</p>
<p><strong>What do you get if you multiply together the sizes of the three largest basins?</strong></p>
</article>
