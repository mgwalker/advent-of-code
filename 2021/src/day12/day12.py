class Cave:
    def __init__(self, name):
        self.start = name == "start"
        self.end = name == "end"
        self.name = name
        self.small = name.lower() == name
        self.connections = set()

    def paths_to_end(self, inc_visits, visited_small_twice=False):
        visits = inc_visits.copy()
        visits[self.name] += 1
        if self.end:
            return [self.name]

        if self.small and visits[self.name] > 1:
            visited_small_twice = True

        check = [cave for cave in self.connections if not cave.start]

        if visited_small_twice:
            check = [
                cave
                for cave in check
                if (cave.small and visits[cave.name] == 0) or (not cave.small)
            ]

        if len(check) > 0:
            paths = []
            for cave in check:
                path = [self.name]
                path += cave.paths_to_end(visits, visited_small_twice)
                paths.append(path)

            return paths
        else:
            return [self.name, ""]


def get_caves():
    pairs = open("input.txt", "r").read().splitlines()
    caves = {}
    for pair in pairs:
        [a, b] = pair.split("-")
        if not a in caves:
            caves[a] = Cave(a)
        if not b in caves:
            caves[b] = Cave(b)
        caves[a].connections.add(caves[b])
        caves[b].connections.add(caves[a])
    return caves


def path_collapse(paths, path_list, str=""):
    for path in paths:
        # print(path)
        if type(path) is list:
            path_collapse(path, path_list, str)
        else:
            if path == "end":
                str += path
                path_list.append(str)
            else:
                str += path + " -> "
    return path_list


def part1():
    caves = get_caves()
    visits = {}
    for cave in caves:
        visits[cave] = 0

    paths = caves["start"].paths_to_end(visits, True)
    paths = path_collapse(paths, [])

    print("Part 1")
    print("   ", len(paths))


def part2():
    caves = get_caves()
    visits = {}
    for cave in caves:
        visits[cave] = 0

    paths = caves["start"].paths_to_end(visits, False)
    paths = path_collapse(paths, [])

    print("Part 2")
    print("   ", len(paths))


part1()
part2()
