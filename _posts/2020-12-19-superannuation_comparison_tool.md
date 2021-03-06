---
title: "Superannuation Comparison Tool"
excerpt: "A tool for comparing different super funds or contribution amounts."
date: "2020-12-19"
last_modified_at: "2020-12-25"
---

## Background

The idea for this tool came after I recently spent some time deliberating over my choice of superannuation fund and wondering whether the fund (and its investment option) was the right one for me. I found this process incredibly painful; the time and effort required to read through different Product Disclosure Statements left me frustrated and no closer to being confident in my choice.

On top of this, I struggled to put into perspective how much the differences between funds mattered. For example:

* We know that higher returns are better, but what difference does an average return of 5.5% p.a. make compared to 6.0% p.a.? Would I be willing to trade off a lower long-term return on my superannuation balance if it meant my money was allocated towards ethical investments?
* Likewise, some super funds charge flat fees, while others charge a percentage of your balance. How much of a difference does this make in the long run?

With this in mind, I sought to create a tool that would help me visualise and understand the answers to these types of questions. The problem is I knew exactly what I wanted to build but no idea how to build it. I had previously dabbled in JavaScript and HTML for some of my PhD experiments, but hadn't really needed to build something from scratch. Fortunately, I was able to draw inspiration from a [different calculator tool](https://investcalc.github.io) I had previously come across (meaning I "borrowed" lots of its code to get me started) and went through a long process of trial-and-error to land upon a workable version!

The remainder of this post dives a bit deeper into the design of the tool, but if that is not of interest, feel free to skip right ahead to the tool itself: [Superannuation Comparison Tool](/assets/posts/superannuation_comparison_tool/super_tool.html)

## About the Tool

The main challenge in building this tool was balancing accuracy and flexibility. I wanted to build a general-purpose tool that could be used by most people (who might vary in how frequently they contribute to their super) but could also compare between different superannuation funds (which might vary in fee structures). Achieving this goal meant that I needed to make a series of simplifying assumptions, meaning the final projected balance may not be exactly accurate; however, the hope is that the tool would at least facilitate a relative comparison of super options.

&nbsp;  

**Assumptions that I've made (and the thought process behind them)**

| Assumption | Rationale |
| ---------- | --------- |
| Contribution amounts remain consistent across your working life. | This is unlikely to be the case, as your contributions will (hopefully) increase as your salary increases further into your career. However, making this assumption keeps the calculation simple. If you were to enter your current contributions (with the expectation that your income will increase in the future), then you can think of the calculated result as the lower bound projection. |
| Investment returns are calculated once per year at the end of the year. | While this will lead to systematic underestimation of super balances (compared to a daily compounding rate), it avoids the need for complicated calculations when users have contributions and fees of varying frequencies (e.g., monthly contributions and weekly flat fees). |
| Percentage fees are applied at the same time as your investment returns are calculated. In other words, they are deducted from the inputted estimated return to calculate the growth rate. | Similar to above, it keeps the calculation simple. It also avoids instances where having the same investment return rate and fee rate actually lead to a slightly smaller balance (e.g., 10% returns and 10% fees would lead to $100 x 1.1 x 0.9 = $99). |
| All super contributions fall under the concessional cap (i.e., they are taxed at 15%). | This is true for the first $25,000 of contributions made per financial year; otherwise, they are taxed at the user's marginal rate. That would overly complicate things as I don't know your tax situation! Fortunately (or unfortunately?), this shouldn't be an issue for *most* Australians as you would need to be earning around $260,000 (25,000 / 9.5%) to reach the cap, assuming no voluntary contributions are made. |
| Inflation occurs at an average rate of 2% p.a. | Allows the tool to estimate balances in real terms and keeps things simple! |

&nbsp;  

**Calculating projected balances**

After making these assumptions, the underlying formula to calculate a projected balance becomes fairly straightforward.

1. Calculate the total amount of contributions made per year based on the amount and frequency.
2. Tax this contribution by 15% and then subtract any flat fees (annualised). This gives the *net annual contribution amount*.
3. Calculate the *annual growth rate* by subtracting any percentage fees and the inflation rate from the estimated investment return rates.
4. Calculate the total value of these contributions using the annuity formula.
5. Add the starting balance (factoring in the annual growth rate).

In a single formula, it looks like this:

![Equation](/assets/posts/superannuation_comparison_tool/calculation_formula.png)

Where:

* *B<sub>n</sub>* is the projected balance after n years
* *C<sub>annual</sub>* is the net annual contribution
* *r<sub>growth</sub>* is the annual growth rate (as a multiplier; e.g., 5% returns would correspond to a 1.05 growth rate)
* *n* is the number of years from today

&nbsp;  

**Sidenote**

It is worth noting that there are two scenarios that I have not designed the tool to be able to handle, again for simplicity.

1. *Insurance costs:* These could be factored into the tool manually by adding it to the fees section (e.g., additional weekly fee of $10). However, insurance costs will increase over your lifetime - and the rate of increase will depend largely on your personal circumstances - which makes it difficult to include in a calculator.
2. *Stepped fee structures:* Some super funds charge different fees based on your balance. To avoid overcomplicating things, I have not incorporated this into the calculator.

## Example Use Case

To conclude this post, I've included an example use case for where this tool could be helpful. Suppose that you are a fresh graduate who is about to start a new job that will pay $70,000 per year. This means that each year, you can expect to contribute $6,650 to your super (9.5% of your annual salary).

You currently have $5,000 in your super account after working some part-time jobs while studying, and you are trying to decide whether or not to change funds before you start your new job.

| Option | Rationale | Estimated Returns* | Flat Fees | Percentage Fees |
| ------ | --------- | ------------------ | --------- | --------------- |
| UniSuper - Balanced | When you first started working, you had no idea what superannuation was and went with the default option offered by your employer. Sticking with this option could reduce the hassle of switching. | 8.50% p.a. | $96 p.a. admin fee | 0.40% investment fees, 0.06% other fees |
| HostPlus - Indexed Balanced | Having read The Barefoot Investor, you felt that a compelling case had been made to invest in the index and keep fees to a minimum. | 8.40% p.a. | $78 p.a. admin fee | 0.02% p.a. investment fees, 0.04% p.a. other fees |
| AustralianSuper - Socially Aware | You like the idea of 'ethical investing' and support the ESG criteria used by AustralianSuper. | 8.23% p.a. | $117 p.a. admin fee | 0.11% p.a. admin fee, 0.67% investment fee |

*\* Estimated returns based on average performance over the previous 10 years. Note that past performance may not necessarily indicate future performance.*

Putting these values into the calculator, we can see how different the projections would be over 40 years of working.

![Inputs](/assets/posts/superannuation_comparison_tool/calculation_input.png)

![Projected Balances](/assets/posts/superannuation_comparison_tool/projected_balances.png)

&nbsp;  

**Final results!**

* HostPlus Indexed Balanced: $998,507
* UniSuper Balanced: $920,839
* AustralianSuper Socially Aware: $788,643

Based on the values we've inputted, it appears that HostPlus' Indexed Balanced option would result in the highest future balance. This is not too surprising given the three options we compared had similar estimated returns, but the HostPlus option had significantly lower fees.

AustralianSuper's Socially Aware option performs the worst because of the 0.78% p.a. percentage fees. This makes a huge difference over the 40-year period; you would potentially end up with $200,000 less in super. If you really wanted to invest in an ethical super option, you would potentially want to look elsewhere for a lower-fee fund (or choose this one if you are willing to trade off the future returns).

## Conclusion

The motivation behind this post was to create a tool that others might find useful in navigating their super decisions (and to teach myself some JS/HTML along the way!). In its current state, I personally find it helpful to visualise the trajectories of my future super under different potential scenarios. In saying that, the tool is by no means perfect, so I am always open to suggestions for how it can be improved!
