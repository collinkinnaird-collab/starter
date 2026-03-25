


# CS 260 Notes

[My startup - PMG for the homies] I will make the link later my guy 

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

I suspect i will be coming back to this to add one or two things, stuff I didnt see coming, but we'll see, also, using <li> is great for stacking stuff. 

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

SO HARD TO GET WHAT I ACTUALLY WANT!!!!

use this: https://getbootstrap.com/docs/5.3/components/buttons/ <-- So Good>

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I am so excited to get reactivity going, I imagine I am going to restructure my app quite a bit and update the ui a bit, but itll be good 

## React Part 2: Reactivity

So, in css file, make thinks to prevent background objects or other stuff not be dynamic if you want other things to be.

ok, so [variable name, thing that manipulates it] => useState;


### Service deliverable 

WHAT!! There are public apis for chatbots. This was so cool. I did need to pay $5, but thats worth, and they'll motify once i reach the limit intead of charging more. The auth stuff was pretty easy actually, i just followed the YT vid. I also wanted rto clean up some of the media, but im already late on this so i'll do more just later


😁 

### Database deliverable 

Ok, this is pretty straightfoward, I have done db before, a bug I had though was the two different ID's I was using, mongo db had the same id for all goals and my frontend had differnt ones. Becuase of this, each goal was treated as the same regarding progess and goal type. So that was good to learn. I also learned that I HAVE A LOT TO KEEP TRACK OF FOR EACH USER. much more than I thought. I implemented one for now (goals) just to submit on time, but I will do the rest later to make it work nice"ish" for the final deliverable. 