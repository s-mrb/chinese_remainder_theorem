/*
Solution using Mixed Radix Notation
https://www.csee.umbc.edu/~lomonaco/s08/441/handouts/Garner-Alg-Example.pdf


EXPLANATION:
Consider following system

x = r1 mod m1
x = r2 mod m2
x = r3 mod m3

Mixed Radix Representation will be

x = v1 + v2*m1 + v3*m1*m2

mods_product = []
mods_product[0] = 1
for i in range(0,num_of_mods):
    mods_product[i+1] = mods_product[i]*mods{i}


prev_v = 0
for i in range(num_of_equations):
    new_v = 1
    while((prev_v+new_v*mods_product[i]) % mods[i] != remainders[i]):
        new_v++

*/

const solve_cong_sys = (remainders, mods) => {
  let moving_mods_product = []
  moving_mods_product[0] = 1

  for (let i = 0; i < mods.length - 1; i++) {
    moving_mods_product[i + 1] = moving_mods_product[i] * mods[i]
  }
  console.log(moving_mods_product)
  let prev_coeff = 0
  let cur_coeff = 1
  let ans = 0
  for (let i = 0; i < remainders.length; i++) {
    new_v = 1
    // console.log(mods[i])
    cur_coeff = prev_coeff + new_v * moving_mods_product[i]

    while (cur_coeff % mods[i] != remainders[i]) {
      cur_coeff = prev_coeff + new_v * moving_mods_product[i]

      new_v++
    }

    prev_coeff = cur_coeff
    ans += cur_coeff
    cur_coeff = 1
  }
  let final_mod = mods.reduce((prev, cur) => prev * cur)
  return prev_coeff % final_mod
}


// Test A
// // left side values of system congruence equations
// const remainders = [4, 1, 2]

// // mods of system congruence equations
// const mods = [5, 7, 11]

// // ans should be 134
// const ans = solve_cong_sys(remainders, mods)

// console.log(ans)


// Test B

// left side values of system congruence equations
const remainders = [3, 1, 6]

// mods of system congruence equations
const mods = [5, 7, 8]

// ans should be 78
const ans = solve_cong_sys(remainders, mods)

console.log(ans)
