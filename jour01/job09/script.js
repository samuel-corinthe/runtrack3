function tri(numbers, order) {
    return numbers.sort((a, b) => order === 'asc' ? a - b : b - a);
}

console.log(tri([5, 2, 9, 1], 'asc'));
console.log(tri([5, 2, 9, 1], 'desc'));
