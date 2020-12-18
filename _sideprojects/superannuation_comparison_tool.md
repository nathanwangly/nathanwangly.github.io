---
title: "Superannuation Comparison Tool"
excerpt: "Iterating towards a tool to compare superannuation funds (and learn JS/HTML along the way)."
---

## Background

The idea for this tool came after I spent some time deliberating over my choice of superannuation fund and wondering whether the fund (and its investment option) was the right one for me. I found this process incredibly painful; the time and effort required to read through different Product Disclosure Statements left me frustrated and no closer to being confident in my choice.

On top of this, I struggled to put into perspective how much the differences in expected returns or fees mattered.

* Sure, we know that higher returns are better - but what difference does an average return of *5.5%* p.a. make compared to *6.0%* p.a.? Would I be willing to trade off a lower long-term return on my superannuation balance if it meant my money was allocated towards ethical investments?
* Likewise, some super funds charge flat fees, while others charge percentages of your balance. How much of a difference does this make in the long run?

With this in mind, I sought to create a tool that would help me visualise and understand the answers to these types of questions. Best case - I create something that others find helpful in making their own super decisions. Worst case - I have a useful resource I can always return to and get to learn more JavaScript and HTML along the way.

The remainder of this post details my journey in learning to build the comparison tool and iterating through versions as I pieced the core functionality together. If you aren't interested in any of that, feel free to skip the rest of this post and check out the different versions!

* V1: A basic calculator that projects your future superannuation balance based on your starting balance, contributions, expected returns, and fees
