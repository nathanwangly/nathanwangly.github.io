---
title: "Superannuation Comparison Tool"
excerpt: "Iterating towards a tool to compare superannuation funds (and learn JS/HTML along the way)."
date: "2020-12-19"
show_date: true
---

## Background

The idea for this tool came after I spent some time deliberating over my choice of superannuation fund and wondering whether the fund (and its investment option) was the right one for me. I found this process incredibly painful; the time and effort required to read through different Product Disclosure Statements left me frustrated and no closer to being confident in my choice.

On top of this, I struggled to put into perspective how much the differences in expected returns or fees mattered.

* Sure, we know that higher returns are better - but what difference does an average return of 5.5% p.a. make compared to 6.0% p.a.? Would I be willing to trade off a lower long-term return on my superannuation balance if it meant my money was allocated towards ethical investments?
* Likewise, some super funds charge flat fees, while others charge a percentage of your balance. How much of a difference does this make in the long run?

With this in mind, I sought to create a tool that would help me visualise and understand the answers to these types of questions. Best case - I create something that others find helpful in making their own super decisions. Worst case - this idea goes nowhere, but I at least get some more experience working with JavaScript and HTML (a personal goal of mine).

The remainder of this post details my journey in learning to build the comparison tool and iterating through versions as I pieced the core functionality together. If you aren't interested in any of that, feel free to skip the rest of this post and check out the different versions!

* V1: A basic calculator that projects your future superannuation balance based on your starting balance, contributions, expected returns, and fees [(LINK)](/assets/sideprojects/superannuation_comparison_tool/v1/super_tool_v1.html)

## Version 1: A Simple Calculator

Although I was excited to get started, the truth was that I didn't really know where to begin. I had some prior experience working with the jsPsych library to build my PhD experiments, but had little experience with building something from scratch. Fortunately, I remembered a calculator tool I had previously come across, which helps users calculate the optimal frequency with which they should invest. Credits go to *codebeard*, who wrote the original source code that I used as the foundation (in other words, copied entirely to start with) before tweaking it for my purposes.

While I had grander plans for the finished tool, I needed to start simple: create a tool that can take user inputs and then perform a calculation. The natural first step was to decide on what inputs were important and how they would impact the final calculation. After a couple of rounds of iteration, I landed on the following inputs:

* Starting superannuation balance
* Contributions - amount and frequency
* Estimated rate of investment returns
* Fees - flat and/or percentage fees
* Number of years to project

The immediate challenge that I encountered was balancing accuracy and flexibility. I wanted to build a general-purpose tool that could be used by most people (who might vary in how frequently they contribute to their super) but would also be able to later compare between different superannuation funds (which might vary in fee structures). Achieving this goal meant that I needed to make a series of simplifying assumptions which means the final projected balance may not be exactly accurate; however, the hope is that it will at least facilitate a relative comparison of super options.

Some of the simplifying assumptions I've made (and the thought process behind them)

| Assumption | Rationale |
| ---------- | --------- |
| Investment returns are calculated once per year at the end of the year | While this will lead to systematic underestimation of super balances (compared to a daily compounding rate), it avoids the need for complicated calculations when users have contributions and fees of varying frequencies (e.g., monthly contributions and weekly flat fees). |
| Percentage fees are applied at the same time as your investment returns are calculated. In other words, they are deducted from the inputted estimated return to calculate the growth rate. | Similar to above, it keeps the calculation simple. It also avoids instances where having the same investment return rate and fee rate actually lead to a slightly smaller balance (e.g., 10% returns and 10% fees would lead to $100 x 1.1 x 0.9 = $99). |
| All super contributions fall under the concessional cap (i.e., they are taxed at 15%). | This is true for the first $25,000 of contributions made per financial year; otherwise, they are taxed at the user's marginal rate. That would overly complicate things as I don't know your tax situation! Fortunately (or unfortunately?), this shouldn't be an issue for *most* Australians as you would need to be earning around $260,000 (25,000 / 9.5%) to reach the cap, assuming no voluntary contributions are made. |

After making these assumptions, the underlying formula to calculate a projected balance becomes fairly straightforward.

1. Calculate the total amount of contributions made per year based on the amount and frequency.
2. Tax this contribution by 15% and then subtract any flat fees (annualised). This gives the **net annual contribution amount**.
3. Calculate the **annual growth rate** by subtracting any percentage fees from the estimated investment return rates.
4. Calculate the total value of these contributions using the annuity formula.
5. Add the starting balance.

In a single formula, it looks like:

INSERT FORMULA

And just like that, we have a working calculator! (And an accompanying graph thanks to the Chart.js library). With this, I can compare two super fund options by entering in their details individually. Let's say I want to compare Hostplus' Indexed Balanced option (a fan favourite thanks to The Barefoot Investor) and the Australian Super counterpart - XXX.
