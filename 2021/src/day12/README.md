# 🎄 Advent of Code 2021 - day 12 🎄

[Original problem](https://adventofcode.com/2021/day/12)

<article class="day-desc"><h2>--- Day 12: Passage Pathing ---</h2><p>With your <span title="Sublime.">submarine's subterranean subsystems subsisting suboptimally</span>, the only way you're getting out of this cave anytime soon is by finding a path yourself. Not just <strong>all</strong> of them.</p>
<p>Fortunately, the sensors are still mostly working, and so you build a rough map of the remaining caves (your puzzle input). For example:</p>
<pre><code>start-A
start-b
A-c
A-b
b-d
A-end
b-end
</code></pre>
<p>This is a list of how all of the caves are connected. You start in the cave named <code>start</code>, and your destination is the cave named <code>end</code>. An entry like <code>b-d</code> means that cave <code>b</code> is connected to cave <code>d</code> - that is, you can move between them.</p>
<p>So, the above cave system looks roughly like this:</p>
<pre><code>    start
    /   \
c--A-----b--d
    \   /
     end
</code></pre>
<p>Your goal is to find the number of distinct <strong>visit big caves any number of times</strong>.</p>
<p>Given these rules, there are <code><strong>10</strong></code> paths through this example cave system:</p>
<pre><code>start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,end
start,A,c,A,b,A,end
start,A,c,A,b,end
start,A,c,A,end
start,A,end
start,b,A,c,A,end
start,b,A,end
start,b,end
</code></pre>
<p>(Each line in the above list corresponds to a single path; the caves visited by that path are listed in the order they are visited and separated by commas.)</p>
<p>Note that in this cave system, cave <code>d</code> is never visited by any path: to do so, cave <code>b</code> would need to be visited twice (once on the way to cave <code>d</code> and a second time when returning from cave <code>d</code>), and since cave <code>b</code> is small, this is not allowed.</p>
<p>Here is a slightly larger example:</p>
<pre><code>dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
</code></pre>
<p>The <code>19</code> paths through it are as follows:</p>
<pre><code>start,HN,dc,HN,end
start,HN,dc,HN,kj,HN,end
start,HN,dc,end
start,HN,dc,kj,HN,end
start,HN,end
start,HN,kj,HN,dc,HN,end
start,HN,kj,HN,dc,end
start,HN,kj,HN,end
start,HN,kj,dc,HN,end
start,HN,kj,dc,end
start,dc,HN,end
start,dc,HN,kj,HN,end
start,dc,end
start,dc,kj,HN,end
start,kj,HN,dc,HN,end
start,kj,HN,dc,end
start,kj,HN,end
start,kj,dc,HN,end
start,kj,dc,end
</code></pre>
<p>Finally, this even larger example has <code>226</code> paths through it:</p>
<pre><code>fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
</code></pre>
<p><strong>How many paths through this cave system are there that visit small caves at most once?</strong></p>
</article>

<article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>After reviewing the available paths, you realize you might have time to visit a single small cave <strong>exactly once each</strong>: once you leave the <code>start</code> cave, you may not return to it, and once you reach the <code>end</code> cave, the path must end immediately.</p>
<p>Now, the <code>36</code> possible paths through the first example above are:</p>
<pre><code>start,A,b,A,b,A,c,A,end
start,A,b,A,b,A,end
start,A,b,A,b,end
start,A,b,A,c,A,b,A,end
start,A,b,A,c,A,b,end
start,A,b,A,c,A,c,A,end
start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,d,b,A,c,A,end
start,A,b,d,b,A,end
start,A,b,d,b,end
start,A,b,end
start,A,c,A,b,A,b,A,end
start,A,c,A,b,A,b,end
start,A,c,A,b,A,c,A,end
start,A,c,A,b,A,end
start,A,c,A,b,d,b,A,end
start,A,c,A,b,d,b,end
start,A,c,A,b,end
start,A,c,A,c,A,b,A,end
start,A,c,A,c,A,b,end
start,A,c,A,c,A,end
start,A,c,A,end
start,A,end
start,b,A,b,A,c,A,end
start,b,A,b,A,end
start,b,A,b,end
start,b,A,c,A,b,A,end
start,b,A,c,A,b,end
start,b,A,c,A,c,A,end
start,b,A,c,A,end
start,b,A,end
start,b,d,b,A,c,A,end
start,b,d,b,A,end
start,b,d,b,end
start,b,end
</code></pre>
<p>The slightly larger example above now has <code>103</code> paths through it, and the even larger example now has <code>3509</code> paths through it.</p>
<p>Given these new rules, <strong>how many paths through this cave system are there?</strong></p>
</article>
