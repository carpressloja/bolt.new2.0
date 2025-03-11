
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string()
    },
    handler: async (ctx, args) => {
        // Your handler logic here
        const user = await ctx.db.query('user').filter((q)=>q.eq(q.field('email'),args.email)).collect();
        // console.log(user);

        if(user.length==0){
            const result =  await ctx.db.insert('user',{
                name: args.name,
                picture:args.picture,
                email:args.email,
                uid:args.uid
            })
            // console.log(result);
        }
    }
});

export const GetUser=query({
    args: {
        email: v.string()
    },
    handler:async (ctx ,args)=>{
        const user = await ctx.db.query('user').filter((q)=>q.eq(q.field('email'),args.email)).collect();
        // console.log(user);
        return user[0];
    }
})