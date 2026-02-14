---
layout: post
title: "Estimating Park&Ride car park availability"
date: 2026-02-14
last_updated: 2026-02-14
description: "A deeper dive into the Park&Ride Availability Predictor tool."
reading_time: 8
---

<div class="summary-card">
  <span class="summary-title">TL;DR</span>
  <ul>
    <li><b>Problem:</b> The Transport for NSW website provides real-time data on the number of available spots at Park&Ride car parks at any given point in time. However, it's still unclear when these car parks typically fill up.</li>
    <li><b>Solution:</b> Build an automated pipeline to analyse historical occupancy data and identify typical capacity trends.</li>
    <li><b>High-level pipeline:</b></li>
      <ol>
        <li>Collect real-time occupancy data via the TfNSW Car park API throughout the day (every 10 min between 5am-10pm) and store in CSV files.</li>
        <li>Once per week, analyse the historical data to calculate insights for each car park (e.g., average available spots at different times of the day), which are stored in a JSON file.</li>
        <li>Generate visualisations based on the insights data, which are presented in the <a href="/projects/parknride-tracker/">tool</a>.</li>
      </ol>
    <li><b>Project repo:</b> <a href="https://github.com/nathanwangly/nsw-park-ride-tracker">https://github.com/nathanwangly/nsw-park-ride-tracker</a>.</li>
  </ul>
</div>

## Background: The problem to be solved

Sydney's 'Park&Ride' car parks offer all-day parking near train stations for public transport users. Unsurprisingly, these car parks are incredibly popular among commuters who need somewhere to park all day while they are away at work - meaning these car parks often fill up quickly.

Occasionally, I will find myself in a situation where it would be convenient to park at my nearest Park&Ride car park. Particularly if it's a weekday, I worry about whether there will be any spots available by the time I arrive. While the <a href="https://transportnsw.info/travel-info/ways-to-get-around/drive/parking/transport-parkride-car-parks">Transport for NSW website</a> shows you real-time data on how many spots are still available, the problem is that these are only ever at a point-in-time; what if they're gone by the time I get there?

In the past, I would just avoid the stress by making less convenient travel plans that didn't involve the Park&Ride car park. But it got me thinking: could I track the real-time data to estimate when the car parks typically fill up by?

<figure class="image-container">
  <img src="/assets/images/TfNSW_realtime_parking_data.png" class="hero-pic" alt="TfNSW Realtime Data">
  <figcaption>Real-time parking availability data shown on the TfNSW website.</figcaption>
</figure>

## Step 1: Sourcing and storing the data

As it turns out, Transport for NSW has a <a href="https://opendata.transport.nsw.gov.au/data/dataset/car-park-api">Car park API</a> that allows you to request a car park's occupancy data at that point in time. Each car park updates its data at a different frequency (e.g., some every 15s, some every 60s, others every 10 min).

I started with ```fetch_occupancy_data.py``` to pull key data from the API: timestamps, car park IDs, and availability.

As part of the script, the data is stored in CSV files that are organised into YYYY-MM formats (e.g., ```2026-02.csv```) to avoid any one file becoming too large. 

<i>(Note: I later realised that the API also provides historical data, which would have made this project much simpler. Nonetheless, I enjoyed the learning process of taking real-time data and building an automated pipeline).</i>

## Step 2: Deciding what insights are needed

I worked backwards from my end goal to determine which insights were actually necessary. To keep things simple, I focused on three goals:
1. For each carpark, display average available spots throughout the day with the ability to also visualise uncertainty/variance.
2. For each carpark, also indicate when it typically becomes full and when spots tend to become available again.
3. Achieve #1 and #2 while considering differences between days of the week (e.g., Fridays are likely quieter) as well as school holiday periods.

## Step 3: Processing the raw data

With a clear set of goals in mind, I created two scripts to get from raw data to insights.

First, ```process_raw_data.py``` merges the raw CSV files and cleans the data. This includes:
- Filtering out invalid rows (e.g., number of occupied spots occasionally shows up as negative).
- Converting timestamps from UTC to Sydney time, and allocates them to 10-min bins.
- Checking whether the timestamp is within the school holiday period (checking against a manually updated JSON file).
- Calculating aggregate statistics for each unique key: <b>car park</b> x <b>day of week</b> x <b>time bin</b> x <b>regular vs school holiday</b>.

In calculating the aggregate statistics, the script also weights recent observations more heavily (λ = 0.96 per month). This weighting ensures the model adapts quickly to changes, like a car park expansion.

The aggregate statistics are then stored in a ```master_stats.csv``` file.

## Step 4: Generating and presenting the insights

The next step was to create a ```generate_insights.py``` script that would convert the aggregate statistics into insights data that could be used for data visualisation.

The script calculates the mean number of available spots and the standard error for confidence intervals.

In addition to this, the script calculates the 'typical' time that each car park becomes full or starts to empty on a given day.
- <b>Becomes full:</b> What is the earliest time that a car park is full (in >80% of observations)?
- <b>Starts to empty:</b> If a car park typically does fill up, what is the earliest time that the car park has >5 spots become available again (in >80% of observations)?

These insights are all stored in an ```insights.json``` file that is used to generate the Park&Ride Availability Predictor Tool.

<figure class="image-container">
  <img src="/assets/images/parknride_tool_screenshot.png" class="hero-pic" alt="Screenshot of Park&Ride Availability Predictor Tool">
  <figcaption>Screenshot of Park&Ride Availability Predictor Tool.</figcaption>
</figure>

## Step 5: Automate the process

The final step was to automate Steps 1-4 so that data would accumulate on its own and the predictions would become more accurate over time.

To automate things, I used a combination of Cron-job.org and Github Actions.

| Frequency | Task | Tool |
| --------- | ---- | ---- |
| Every 10 min between 5am-10pm | Call the TfNSW API using ```fetch_occupancy_data.py``` and store the updated data in a ```data-storage``` branch. | Cron-job.org | 
| Daily, around midnight | Merge the ```data-storage``` branch into the ```main``` branch to add in the new day's data. | Github Actions | 
| Weekly, around Monday midnight | Run the data processing pipeline (```process_raw_data.py``` and ```generate_insights.py```) to produce an updated ```insights.json``` file for the tool. | Github Actions |

<i>(Note: I originally started by trying to use Github Actions to call the API every 10 minutes. However, I found that the timing was unreliable, which led to poor data collection and resulted in me switching over to Cron-job.org).</i>

## Final reflections

This was a fun 2-ish week project to work on. The code itself wasn't complex, but managing ongoing data collection was a new challenge.

I struggled to find the right balance between over-planning and immediate execution. On the one hand, I recognised that the greatest bottleneck for this project would be the time needed to collect enough data, so I wanted to get started as quickly as possible. On the other hand, I realised that if I wasn't thoughtful about what data I collected and how it would be used, I could end up having to throw things out midway and start again (which did end up happening once - thankfully only after a few days of starting to collect data).

<b>Things I learned on this project:</b>
- How to call an API
- How to automate workflows using Cron-job.org and Github Actions
- Pros and cons of different ways of managing historical data

Finally, this project was once again a reminder of how much more I can do with the assistance of AI tools. Pre-AI, I may have dismissed this project idea before even starting (fearing that it would be too complicated to work with APIs or automated workflows). Or, with some persistence, it might have taken me a few months to set up.

My biggest constraint is no longer technical; it's simply the scale of the problems I can identify.