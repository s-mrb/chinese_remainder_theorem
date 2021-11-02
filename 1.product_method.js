

const solve_cong_sys = (remainder_array, mods_array) => {
  // find product of mods
  let n = mods_array.reduce((accumulator, currentValue) => {
    return accumulator * currentValue
  })

  // find relative mod_array, product/mod[i]
  let relative_mod_array = []
  mods_array.forEach((element, index) => {
    relative_mod_array[index] = n / element
  })

  // find multiplicative modulo inverse of relative_mod[i] wrt mods_array[i]
  let inverse_mods = []
  for (let i = 0; i < mods_array.length; i++) {
    inverse_mods[i] = mod_inv(relative_mod_array[i], mods_array[i], 1)
  }
  let res = 0
  for (let i = 0; i < remainder_array.length; i++) {
    res += remainder_array[i] * relative_mod_array[i] * inverse_mods[i]
  }

  return res % n
}

//stores a and b values, and return them along with gcd
const dynamic_gcd = (a, b) => {
  var a_array = [],
    b_array = []

  a_array.unshift(a)
  b_array.unshift(b)

  while (b != 0) {
    temp = b
    b = a % b
    a = temp

    a_array.unshift(a)
    b_array.unshift(b)
  }
  return [a, a_array, b_array]
}

const find_diaphantine_coeff = (a_array, b_array) => {
  var x = 1
  var y = 0
  var temp
  for (i = 1; i < a_array.length; i++) {
    temp = x
    x = y
    y = temp - y * Math.floor(a_array[i] / b_array[i])
  }

  return [x, y]
}

const mod_inv = (coef, mod, remainder) => {
  var [g, a, b] = dynamic_gcd(coef, mod)
  var [x, y] = find_diaphantine_coeff(a, b)
  x = (x / g) * remainder
  if (x < 0) {
    x = x + mod
  }
  return x
}

// left side values of system congruence equations
const remainders = [3, 1, 6]

// mods of system congruence equations
const mods = [5, 7, 8]

// ans should be 78
const ans = solve_cong_sys(remainders, mods)

console.log(ans)
