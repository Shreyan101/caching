# Caching Explained with SSG | ISR | CSR | SSR

## SSG - STATIC SITE GENERATION

Reduce server load | SEO | Crawler can be able able to crawl from static file to rank in search engine

Create 
```
npx create-next-app@latest
```

Make a static folder 

```
static 
| 
| __ page.tsx
```

```
import React from "react";

export const metadata = {
  titile: "static page",
  description: "This is a static page",
};

const Static = () => {
  return <div className="flex w-full justify-center items-center h-screen">Static Site Generation : {Date.now()}</div>;
};

export default Static;
```

build it -  
```
npm run build
```


```
   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types    
 ✓ Collecting page data    
 ✓ Generating static pages (6/6)
 ✓ Collecting build traces    
 ✓ Finalizing page optimization    

Route (app)                                 Size  First Load JS    
┌ ○ /                                      139 B         101 kB
├ ○ /_not-found                            977 B         101 kB
└ ○ /static                                139 B         101 kB
+ First Load JS shared by all             100 kB
  ├ chunks/4bd1b696-5b6c0ccbd3c0c9ab.js  53.2 kB
  ├ chunks/684-c131fa2291503b5d.js       45.3 kB
  └ other shared chunks (total)          1.88 kB


○  (Static)  prerendered as static content
```

The  ○ /static  circle beside static shows it run statically. now
```
npm run start
```

Try to refresh the page the Date.now() value will not change. Ie: bcs when we build our apple it creates html file for the page. HTML file gets generated and built statically in build folder.static site generation is used to speed up initial page loading.[Landing page, About us, Footer, Privacy] - it will not regenerate when user request it.

## ISR - INCREMENTAL STATIC REGENERATION


- If the content is not dynamically changing a lot or it is getting changes in an hour or some , so we will not want to rebuild again and deploy and want to store all file in .next folder.so after some time we want out file to serenader after specific time.

```
import React from "react";

export const metadata = {
  titile: "Static Revalidate page",
  description: "This is a Static Revalidate page",
};

export const revalidate = 5;

const StaticRevalidate = () => {
  return <div className="flex w-full justify-center items-center h-screen">Static Revalidate Site Generation : {Date.now()}</div>;
};

export default StaticRevalidate;
```



It will revalidate after 5 sec , it is good for pages that contain some data that we want to be revalidated after some time.if we put 0 in  export const revalidate = 0; it means it will be considered as to be from server side, so you will not find it inside .next folder

```
   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types    
 ✓ Collecting page data    
 ✓ Generating static pages (6/6)
 ✓ Collecting build traces    
 ✓ Finalizing page optimization    

Route (app)                                 Size  First Load JS    
┌ ○ /                                      142 B         101 kB
├ ○ /_not-found                            977 B         101 kB
├ ○ /static                                142 B         101 kB
└ ƒ /static-revalidate                     142 B         101 kB
+ First Load JS shared by all             100 kB
  ├ chunks/4bd1b696-5b6c0ccbd3c0c9ab.js  53.2 kB
  ├ chunks/684-c131fa2291503b5d.js       45.3 kB
  └ other shared chunks (total)          1.88 kB


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

If you see ,  ƒ /static-revalidate   , here the  ƒ means it is server side generated.

## CSR - CLIENT SIDE RENDERING

Every Component in next.js is by default rendered from  server side.we make page from client side if it has user interaction, like button click, drag drop.on server side we can’t add obj which has user interaction.It is never recommended to make directly page.tsx ( route level component ) “use client”, client side, better make a component make it client side and put it as child component.Reason is : we  can’t set meta data on client side component.

In order to use hook you have to make page client site

```
"use client";

import React, { useEffect, useState } from "react";

const ClientSide = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => setUsers(data?.results));
  }, []);

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen">
      Client Site Generation : {Date.now()}
      <div className="w-full flex flex-col gap-5">
        {users.map((user) => (
          <div key={user.email}>{user?.email}</div>
        ))}
      </div>
    </div>
  );
};

export default ClientSide;
```


## SSR - SERVER SIDE RENDERING

```
import React from "react";

export const metadata = {
  titile: "ServerSide page",
  description: "This is a ServerSide page",
};

const fetchUsers = async () => {
  const res = await fetch("https://randomuser.me/api/?results=10");
  const data = await res.json();
  return data?.results;
};

const ServerSide = async () => {
  const users = await fetchUsers();
  console.log("users", users);  
  return (
    <div className="flex w-full justify-center items-center h-screen">
      ServerSide Site Generation : {Date.now()}
    </div>
  );
};

export default ServerSide;
```

```
 ✓ Finalizing page optimization    

Route (app)                                 Size  First Load JS  Revalidate  Expire
┌ ○ /                                      145 B         101 kB
├ ○ /_not-found                            977 B         101 kB
├ ○ /client-side                           487 B         101 kB
├ ○ /server-side                           145 B         101 kB
├ ○ /static                                145 B         101 kB
└ ○ /static-revalidate                     145 B         101 kB          5s      1y
+ First Load JS shared by all             100 kB
  ├ chunks/4bd1b696-704dc55da575ac8d.js  53.2 kB
  ├ chunks/684-dd692206fb1b2990.js       45.3 kB
  └ other shared chunks (total)          1.88 kB


○  (Static)  prerendered as static content
```

If you check page source , you will find all the email there so it helps in SEO

￼

We need to manually have cache force for apis in next js 15 

 ```
  const res = await fetch("https://randomuser.me/api/?results=10", {cache: "force-cache"});
```

## PPR - PARTIAL PRE RENDERING

# caching
