# B.I.R.D. API

**B**rutal  
**I**nterstellar  
**R**anged  
**D**etonator  

----

BIRD API is the government's secret remote API for their spy drones disguised
as a flying animal called a "bird." The Bird can detect threats to democracy
and send a signal to an orbiting satellite through this API, which then fires
an orbital space laser directly at the threat's home. The API can also be used
to send signals activating panic mode, which self-destructs the drone. 

---

## What B.I.R.D. API Actually Is
BIRD API is a simulation of what could be happening if the "Birds Aren't Real"
joke conspiracy theory was a reality. It creates "bird" drones that fly around
America and accept missions to search for threats, observe or spy on targets,
or eliminate threats to democracy. When an API request is received, the server
updates dynamic information about each drone based on how much time has passed
since the last request, what each bird is doing, and random factors. For example,
a bird's battery level may fall below 20% and it enters "recharge" mode, where
the bird actively searches for a recharging location such as power lines; while
charging, the battery level goes up instead of down. If the bird is in "active"
mode, it flies to its destination and works on its mission. If random chance 
decides the drone has blown its cover, it goes into "panic" mode, which activates
the self-destruct sequence. If the bird is only accompanied by one person when
discovered, it flies into the victim's face as its self-destruct charge detonates.

While a lot of this is automated, the API can be used to, for example, input a
new mission, get system info such as battery status or current target, or enter
panic mode manually. The API serves as a control panel to track and manually
intervene the mostly autonomous drones.

Some functions will require authorization to prevent abuse of the system,
while others, such as purely informational endpoints, will be free for anyone
to use.

---

## Documentation and lore
Below, I will put somewhat unorganized information about both the lore and inner
workings of this API. I will update this either as I come up with ideas or as
I implement relevant features.

### The BIRD Hive
The "BIRD Hive" is a reference to the network connecting all bird drones
together, similar to a hive mind. In actuality, the Hive is the MongoDB Atlas
database that stores the data for each bird drone.

### Bird Factories
There are eighteen secret government bird manufacturing facilities spread across
the United States. Whenever a new drone is created, it comes from one of these
top secret factories.