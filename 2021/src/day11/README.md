# 🎄 Advent of Code 2021 - day 11 🎄
[Original problem](https://adventofcode.com/2021/day/11)

<article class="day-desc"><h2>--- Day 11: Dumbo Octopus ---</h2><p>You enter a large cavern full of rare bioluminescent <a href="https://www.youtube.com/watch?v=eih-VSaS2g0" target="_blank">dumbo octopuses</a>! They seem to not like the Christmas lights on your submarine, so you turn them off for now.</p>
<p>There are 100 <span title="I know it's weird; I grew up saying 'octopi' too.">octopuses</span> arranged neatly in a 10 by 10 grid. Each octopus slowly gains <strong>energy</strong> over time and <strong>flashes</strong> brightly for a moment when its energy is full. Although your lights are off, maybe you could navigate through the cave without disturbing the octopuses if you could predict when the flashes of light will happen.</p>
<p>Each octopus has an <strong>energy level</strong> - your submarine can remotely measure the energy level of each octopus (your puzzle input). For example:</p>
<pre><code>5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
</code></pre>
<p>The energy level of each octopus is a value between <code>0</code> and <code>9</code>. Here, the top-left octopus has an energy level of <code>5</code>, the bottom-right one has an energy level of <code>6</code>, and so on.</p>
<p>You can model the energy levels and flashes of light in <strong>steps</strong>. During a single step, the following occurs:</p>
<ul>
<li>First, the energy level of each octopus increases by <code>1</code>.</li>
<li>Then, any octopus with an energy level greater than <code>9</code> <strong>flashes</strong>. This increases the energy level of all adjacent octopuses by <code>1</code>, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than <code>9</code>, it <strong>also flashes</strong>. This process continues as long as new octopuses keep having their energy level increased beyond <code>9</code>. (An octopus can only flash <strong>at most once per step</strong>.)</li>
<li>Finally, any octopus that flashed during this step has its energy level set to <code>0</code>, as it used all of its energy to flash.</li>
</ul>
<p>Adjacent flashes can cause an octopus to flash on a step even if it begins that step with very little energy. Consider the middle octopus with <code>1</code> energy in this situation:</p>
<pre><code>Before any steps:
11111
19991
19191
19991
11111

After step 1:
34543
4<strong>000</strong>4
5<strong>000</strong>5
4<strong>000</strong>4
34543

After step 2:
45654
51115
61116
51115
45654
</code></pre>
<p>An octopus is <strong>highlighted</strong> when it flashed during the given step.</p>
<p>Here is how the larger example above progresses:</p>
<pre><code>Before any steps:
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526

After step 1:
6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637

After step 2:
88<strong>0</strong>7476555
5<strong>0</strong>89<strong>0</strong>87<strong>0</strong>54
85978896<strong>0</strong>8
84857696<strong>00</strong>
87<strong>00</strong>9<strong>0</strong>88<strong>00</strong>
66<strong>000</strong>88989
68<strong>0000</strong>5943
<strong>000000</strong>7456
9<strong>000000</strong>876
87<strong>0000</strong>6848

After step 3:
<strong>00</strong>5<strong>0</strong>9<strong>00</strong>866
85<strong>00</strong>8<strong>00</strong>575
99<strong>000000</strong>39
97<strong>000000</strong>41
9935<strong>0</strong>8<strong>00</strong>63
77123<strong>00000</strong>
791125<strong>000</strong>9
221113<strong>0000</strong>
<strong>0</strong>421125<strong>000</strong>
<strong>00</strong>21119<strong>000</strong>

After step 4:
2263<strong>0</strong>31977
<strong>0</strong>923<strong>0</strong>31697
<strong>00</strong>3222115<strong>0</strong>
<strong>00</strong>41111163
<strong>00</strong>76191174
<strong>00</strong>53411122
<strong>00</strong>4236112<strong>0</strong>
5532241122
1532247211
113223<strong>0</strong>211

After step 5:
4484144<strong>000</strong>
2<strong>0</strong>44144<strong>000</strong>
2253333493
1152333274
11873<strong>0</strong>3285
1164633233
1153472231
6643352233
2643358322
2243341322

After step 6:
5595255111
3155255222
33644446<strong>0</strong>5
2263444496
2298414396
2275744344
2264583342
7754463344
3754469433
3354452433

After step 7:
67<strong>0</strong>7366222
4377366333
4475555827
34966557<strong>0</strong>9
35<strong>00</strong>6256<strong>0</strong>9
35<strong>0</strong>9955566
3486694453
8865585555
486558<strong>0</strong>644
4465574644

After step 8:
7818477333
5488477444
5697666949
46<strong>0</strong>876683<strong>0</strong>
473494673<strong>0</strong>
474<strong>00</strong>97688
69<strong>0000</strong>7564
<strong>000000</strong>9666
8<strong>00000</strong>4755
68<strong>0000</strong>7755

After step 9:
9<strong>0</strong>6<strong>0000</strong>644
78<strong>00000</strong>976
69<strong>000000</strong>8<strong>0</strong>
584<strong>00000</strong>82
5858<strong>0000</strong>93
69624<strong>00000</strong>
8<strong>0</strong>2125<strong>000</strong>9
222113<strong>000</strong>9
9111128<strong>0</strong>97
7911119976

After step 10:
<strong>0</strong>481112976
<strong>00</strong>31112<strong>00</strong>9
<strong>00</strong>411125<strong>0</strong>4
<strong>00</strong>811114<strong>0</strong>6
<strong>00</strong>991113<strong>0</strong>6
<strong>00</strong>93511233
<strong>0</strong>44236113<strong>0</strong>
553225235<strong>0</strong>
<strong>0</strong>53225<strong>0</strong>6<strong>00</strong>
<strong>00</strong>3224<strong>0000</strong>
</code></pre>

<p>After step 10, there have been a total of <code>204</code> flashes. Fast forwarding, here is the same configuration every 10 steps:</p>

<pre><code>After step 20:
3936556452
56865568<strong>0</strong>6
449655569<strong>0</strong>
444865558<strong>0</strong>
445686557<strong>0</strong>
568<strong>00</strong>86577
7<strong>00000</strong>9896
<strong>0000000</strong>344
6<strong>000000</strong>364
46<strong>0000</strong>9543

After step 30:
<strong>0</strong>643334118
4253334611
3374333458
2225333337
2229333338
2276733333
2754574565
5544458511
9444447111
7944446119

After step 40:
6211111981
<strong>0</strong>421111119
<strong>00</strong>42111115
<strong>000</strong>3111115
<strong>000</strong>3111116
<strong>00</strong>65611111
<strong>0</strong>532351111
3322234597
2222222976
2222222762

After step 50:
9655556447
48655568<strong>0</strong>5
448655569<strong>0</strong>
445865558<strong>0</strong>
457486557<strong>0</strong>
57<strong>000</strong>86566
6<strong>00000</strong>9887
8<strong>000000</strong>533
68<strong>00000</strong>633
568<strong>0000</strong>538

After step 60:
25333342<strong>00</strong>
274333464<strong>0</strong>
2264333458
2225333337
2225333338
2287833333
3854573455
1854458611
1175447111
1115446111

After step 70:
8211111164
<strong>0</strong>421111166
<strong>00</strong>42111114
<strong>000</strong>4211115
<strong>0000</strong>211116
<strong>00</strong>65611111
<strong>0</strong>532351111
7322235117
5722223475
4572222754

After step 80:
1755555697
59655556<strong>0</strong>9
448655568<strong>0</strong>
445865558<strong>0</strong>
457<strong>0</strong>86557<strong>0</strong>
57<strong>000</strong>86566
7<strong>00000</strong>8666
<strong>0000000</strong>99<strong>0</strong>
<strong>0000000</strong>8<strong>00</strong>
<strong>0000000000</strong>

After step 90:
7433333522
2643333522
2264333458
2226433337
2222433338
2287833333
2854573333
4854458333
3387779333
3333333333

After step 100:
<strong>0</strong>397666866
<strong>0</strong>749766918
<strong>00</strong>53976933
<strong>000</strong>4297822
<strong>000</strong>4229892
<strong>00</strong>53222877
<strong>0</strong>532222966
9322228966
7922286866
6789998766
</code></pre>
<p>After 100 steps, there have been a total of <code><strong>1656</strong></code> flashes.</p>
<p>Given the starting energy levels of the dumbo octopuses in your cavern, simulate 100 steps. <strong>How many total flashes are there after 100 steps?</strong></p>
</article>

<article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>It seems like the individual flashes aren't bright enough to navigate. However, you might have a better option: the flashes seem to be <strong>synchronizing</strong>!</p>
<p>In the example above, the first time all octopuses flash simultaneously is step <code><strong>195</strong></code>:</p>
<pre><code>After step 193:
5877777777
8877777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777

After step 194:
6988888888
9988888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888

After step 195:
<strong>0000000000</strong>
<strong>0000000000</strong>
<strong>0000000000</strong>
<strong>0000000000</strong>
<strong>0000000000</strong>
<strong>0000000000</strong>
<strong>0000000000</strong>
<strong>0000000000</strong>
<strong>0000000000</strong>
<strong>0000000000</strong>
</code></pre>
<p>If you can calculate the exact moments when the octopuses will all flash simultaneously, you should be able to navigate through the cavern. <strong>What is the first step during which all octopuses flash?</strong></p>
</article>
