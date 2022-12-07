# 🎄 Advent of Code 2022 - day 7 🎄
[Original problem](https://adventofcode.com/2022/day/7)

<article class="day-desc"><h2>--- Day 7: No Space Left On Device ---</h2><p>You can hear birds chirping and raindrops hitting leaves as the expedition proceeds. Occasionally, you can even hear much louder sounds in the distance; how big do the animals get out here, anyway?</p>
<p>The device the Elves gave you has problems with more than just its communication system. You try to run a system update:</p>
<pre><code>$ system-update --please --pretty-please-with-sugar-on-top
<span title="E099 PROGRAMMER IS OVERLY POLITE">Error</span>: No space left on device
</code></pre>
<p>Perhaps you can delete some files to make space for the update?</p>
<p>You browse around the filesystem to assess the situation and save the resulting terminal output (your puzzle input). For example:</p>
<pre><code>$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
</code></pre>
<p>The filesystem consists of a tree of files (plain data) and directories (which can contain other directories or files). The outermost directory is called <code>/</code>. You can navigate around the filesystem, moving into or out of directories and listing the contents of the directory you're currently in.</p>
<p>Within the terminal output, lines that begin with <code>$</code> are <strong>commands you executed</strong>, very much like some modern computers:</p>
<ul>
<li><code>cd</code> means <strong>change directory</strong>. This changes which directory is the current directory, but the specific result depends on the argument:
  <ul>
  <li><code>cd x</code> moves <strong>in</strong> one level: it looks in the current directory for the directory named <code>x</code> and makes it the current directory.</li>
  <li><code>cd ..</code> moves <strong>out</strong> one level: it finds the directory that contains the current directory, then makes that directory the current directory.</li>
  <li><code>cd /</code> switches the current directory to the outermost directory, <code>/</code>.</li>
  </ul>
</li>
<li><code>ls</code> means <strong>list</strong>. It prints out all of the files and directories immediately contained by the current directory:
  <ul>
  <li><code>123 abc</code> means that the current directory contains a file named <code>abc</code> with size <code>123</code>.</li>
  <li><code>dir xyz</code> means that the current directory contains a directory named <code>xyz</code>.</li>
  </ul>
</li>
</ul>
<p>Given the commands and output in the example above, you can determine that the filesystem looks visually like this:</p>
<pre><code>- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
</code></pre>
<p>Here, there are four directories: <code>/</code> (the outermost directory), <code>a</code> and <code>d</code> (which are in <code>/</code>), and <code>e</code> (which is in <code>a</code>). These directories also contain files of various sizes.</p>
<p>Since the disk is full, your first step should probably be to find directories that are good candidates for deletion. To do this, you need to determine the <strong>total size</strong> of each directory. The total size of a directory is the sum of the sizes of the files it contains, directly or indirectly. (Directories themselves do not count as having any intrinsic size.)</p>
<p>The total sizes of the directories above can be found as follows:</p>
<ul>
<li>The total size of directory <code>e</code> is <strong>584</strong> because it contains a single file <code>i</code> of size 584 and no other directories.</li>
<li>The directory <code>a</code> has total size <strong>94853</strong> because it contains files <code>f</code> (size 29116), <code>g</code> (size 2557), and <code>h.lst</code> (size 62596), plus file <code>i</code> indirectly (<code>a</code> contains <code>e</code> which contains <code>i</code>).</li>
<li>Directory <code>d</code> has total size <strong>24933642</strong>.</li>
<li>As the outermost directory, <code>/</code> contains every file. Its total size is <strong>48381165</strong>, the sum of the size of every file.</li>
</ul>
<p>To begin, find all of the directories with a total size of <strong>at most 100000</strong>, then calculate the sum of their total sizes. In the example above, these directories are <code>a</code> and <code>e</code>; the sum of their total sizes is <code><strong>95437</strong></code> (94853 + 584). (As in this example, this process can count files more than once!)</p>
<p>Find all of the directories with a total size of at most 100000. <strong>What is the sum of the total sizes of those directories?</strong></p>
</article>

<article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>Now, you're ready to choose a directory to delete.</p>
<p>The total disk space available to the filesystem is <code><strong>70000000</strong></code>. To run the update, you need unused space of at least <code><strong>30000000</strong></code>. You need to find a directory you can delete that will <strong>free up enough space</strong> to run the update.</p>
<p>In the example above, the total size of the outermost directory (and thus the total amount of used space) is <code>48381165</code>; this means that the size of the <strong>unused</strong> space must currently be <code>21618835</code>, which isn't quite the <code>30000000</code> required by the update. Therefore, the update still requires a directory with total size of at least <code>8381165</code> to be deleted before it can run.</p>
<p>To achieve this, you have the following options:</p>
<ul>
<li>Delete directory <code>e</code>, which would increase unused space by <code>584</code>.</li>
<li>Delete directory <code>a</code>, which would increase unused space by <code>94853</code>.</li>
<li>Delete directory <code>d</code>, which would increase unused space by <code>24933642</code>.</li>
<li>Delete directory <code>/</code>, which would increase unused space by <code>48381165</code>.</li>
</ul>
<p>Directories <code>e</code> and <code>a</code> are both too small; deleting them would not free up enough space. However, directories <code>d</code> and <code>/</code> are both big enough! Between these, choose the <strong>smallest</strong>: <code>d</code>, increasing unused space by <code><strong>24933642</strong></code>.</p>
<p>Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. <strong>What is the total size of that directory?</strong></p>
</article>
