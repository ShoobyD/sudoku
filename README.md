# Sudoku Solver #

A web app to solve Sudoku puzzles.

[Demo](https://shoobyd.github.io/sudoku/)


## ToDo List ##

* typing/import/export data for large table (4+ blocks)
* Bug: 'changed' class on type+delete
* Saving initial state
* Add reset to initial state
* Updating cell empty
* Split in case of multi-solutions


### Done ###

* Error checking
* Importing data block
* Class 'changed' only on real changes
* Adding 'cells' array for loops simplifying
* Backspace


### Defunct ###

* Dialog



## Tests ##


~~~
- 9 - - 6 - 4 - -
- - - 1 4 - 7 - 5
7 4 - 2 - - - - -
- - - - - - 6 7 -
1 3 - - - - - 8 9
- 5 7 - - - - - -
- - - - - 9 - 4 7
4 - 6 - 1 5 - - -
- - 9 - 2 - - 5 -
~~~

~~~
- - - - - - - - -
- 4 - - - - - 4 -
- - - - - - - - -
- - - - - - - - -
- - - - - - - - -
- - - - - - - - -
- - - - - - - - -
- - - - - - - - -
- - - - - - - - -
~~~

~~~
6 4 - 2 - 1 9 - 5
- - - - - 3 - - 8
2 - - - - - - - -
7 6 - - - - - - 9
- - - - 8 - - - -
3 - - - - - - 7 2
- - - - - - - - 4
9 - - 1 - - - - -
5 - 7 3 - 9 - 6 1
~~~

~~~
8 5 - - - - - - 1
- - - - 1 - - - 6
- - 6 - 5 - 9 - -
- - - 7 - 5 - - -
- 6 7 - - - 4 3 -
- - - 4 - 3 - - -
- - 8 - 7 - 1 - -
1 - - - 2 - - - -
5 - - - - - - 4 9
~~~

~~~
- - 5 6 - - 9 - -
- 3 - - 5 - - 2 -
1 - - - - 9 - - 8
- - 1 - - - - - 2
- 4 - - 2 - - 7 -
9 - - - - - 8 - -
2 - - 3 - - - - 1
- 7 - - 1 - - 5 -
- - 4 - - 7 6 - -
~~~

~~~
5 - - 16 4 - - 6 3 - - 1 7 - - 9
- - - 8 13 - - - - - - 12 1 - - -
- - 3 4 5 9 - 11 13 - 2 6 10 8 - -
12 9 10 - - - 2 - - 14 - - - 3 13 6
4 16 5 - - - 10 - - 8 - - - 2 9 7
- - 8 - - 15 - 4 10 - 13 - - 6 - -
- - - 13 3 - 7 - - 2 - 11 5 - - -
11 - 7 - - 12 - - - - 5 - - 1 - 14
6 - 4 - - 11 - - - - 16 - - 9 - 13
- - - 11 10 - 9 - - 4 - 1315 - - -
- - 16 - - 6 - 15 5 - 3 - - 10 - -
2 12 15 - - - 13 - - 6 - - - 11 14 3
10 4 11 - - - 8 - - 13 - - - 15 3 12
- - 9 3 2 13 - 1011 - 8 15 14 16 - -
- - - 1 12 - - - - - - 4 9 - - -
16 - - 12 7 - - 14 2 - - 3 8 - - 5
~~~






