# Case

## 1. exercise

Answer to the first question: 2.3259899543172153

## 2. exercise

Regarding the UI/UX:
- as mentioned there should be a loader
- the message shown could show a bit more information (e.g.: what exact point was clicked, what point does the data belong to)
- the max wave height's precision could be smaller so it's easier to understand, if this is appropriate for the use case
- in general better design for the popup

## 3. exercise

Right now the solution calculates the maximum on the fly. With a much bigger dataset, we would have performance problems, most likely the app would take a very long time to respond, also it might significantly increase memory usage.

To avoid this it would be best to calculate the maximums with a script and the app would only have to read from the file which contains the maximums.

Concerns:
- How often do we receive updates to the dataset?
- What's the expected deadline to update the dataset?
- What's the format of the updates?
- Depending on some answers above: How long does it take to calculate the maximum?
- Right now the dataset is bundled with the app. Ideally, especially if we have to consider updates, it should be external, for example in a bucket.
- Do we need more data about the maximum point of data?
- Do we need other aggregations? Are these statically or dynamically defined?

## 4. exercise

At first I would communicate to the designer that it's difficult to implement it as it is because of having to load so much data. For example there would be issues with load time.

After that I would try to validate the use case:
- How does this help with our objective of enabling building floating solar?
- Why do we need the animations? The animations might slow down the user trying to understand the data.

If the use case justifies the design then we should try to introduce some constraints:
- At what zoom level should animations appear?
- Can we limit the date range?

# Notes

## The reasoning behind your overall approach and your tech choices. Describe trade offs you did to meet the time limit.

When choosing a framework for the backend, Django looked like a big overkill for this task as I don't need an ORM, I don't need authentication, etc. So I chose Flask as it was described as a lightweight alternative.
In case we would be planning to work on this for longer, with a bigger team, it might be a good idea to consider some other framework.

Regardless I tried to introduce some layers in the app (routes, repositories). Initially I wanted to add a service layer as well, but I realized, that I don't have too much business logic that has to be handled in app code. I introduce the two layers because it was easier for me to write the code where the responsibilities were clearly separate. This is also good for testing.

Considering the time limit and the simplicity I didn't add tests.

For showing the map I used a very simple html and js file. Introducing any framework would have had a big overhead, and the exercise was simple enough to handle like this. In case this would need to be maintained, I would probably look for some more robust alternative. I would att least try to use TypeScript.

Right now I the max wave height for a coordinate is available through a GET endpoint, that returns just a number. If we want to keep the app in a single language, it could be an alternative to return html from the backend, so we do even less coding on the frontend. Although, this wouldn't be my preference.

I used Leaflet to show the map with OpenStreetMap tiles. This was probably the easiest to start with.

For the data I just bundled the dataset with the app. This is okay for now as the size of the dataset is limited. Alternatively this should be stored separately. This could mean having the file in a bucket or loading some data into some database. I don't have much experience with working with file formats like this, so if we decided to do this. I would start with having the file in a bucket, and consider some changes when we experience performance issues.

I am opening the file for every request. This could be a problem in a multi-user scenario.

## Describe if you used AI, and if so, how/for what?

- As I'm not very experienced with Python I used AI to advise me on structuring the project, so it's somewhat idiomatic to how a Flask project would look like. It also helped me with setting up a python environment.
- I don't have much experience with xarray, so I used AI to help me understand what are dimensions, values, how stuff like "nearest" work, etc. This saved me a lot of time because I didn't have to dig through all the documentation for a simple task.
- I noticed that when using Leaflet and not having bound on the map, the coordinates went out of the bounds of the data and caused issues. So I used AI to help me figure out how to normalize the coordinates into the bounds.
