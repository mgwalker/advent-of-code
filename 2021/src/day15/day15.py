import networkx as nx
import time

raw = open("input.txt", "r").read()


def input():
    return [[int(x) for x in line] for line in raw.splitlines()]


def make_graph(table):
    edges = []
    for y, row in enumerate(table):
        for x, _ in enumerate(row):
            neighbor_x = x - 1
            neighbor_y = y - 1
            if neighbor_x >= 0:
                edges.append(((x, y), (neighbor_x, y), table[y][neighbor_x]))
            if neighbor_y >= 0:
                edges.append(((x, y), (x, neighbor_y), table[neighbor_y][x]))

            neighbor_x = x + 1
            neighbor_y = y + 1
            if neighbor_x < len(row):
                edges.append(((x, y), (neighbor_x, y), table[y][neighbor_x]))
            if neighbor_y < len(table):
                edges.append(((x, y), (x, neighbor_y), table[neighbor_y][x]))

    graph = nx.DiGraph()
    graph.add_weighted_edges_from(edges)

    return graph


def get_shortest_path(table):
    start = (0, 0)
    end = (len(table) - 1, len(table[0]) - 1)
    graph = make_graph(table)
    shortest_path = nx.shortest_path(graph, start, end, "weight")
    return sum([table[y][x] for (x, y) in shortest_path if x > 0 or y > 0])


def part1():
    table = input()
    lowest_risk = get_shortest_path(table)
    return lowest_risk


def part2():
    table = input()

    for row in table:
        new_row = row[0:]
        for i in range(0, 4):
            row.extend([(risk + i) % 9 + 1 for risk in new_row])

    rows = table[0:]
    for i in range(0, 4):
        table.extend([[(risk + i) % 9 + 1 for risk in row] for row in rows])

    return get_shortest_path(table)


print("Part 1")
t1 = time.time()
sol = part1()
t2 = time.time()
print("   ", sol)
print("   ", round(1000 * (t2 - t1), 3), "ms")
print()

print("Part 2")
t1 = time.time()
sol = part2()
t2 = time.time()
print("   ", sol)
print("   ", round(1000 * (t2 - t1), 3), "ms")
