import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",

  auth: true,

  admin: {
    useAsTitle: "email",
  },

 access: {
  create: () => true,

  read: ({ req, id }) => {
    if (!req.user) {
      return false;
    }

    // Admins can read users
    if (req.user.role === "admin") {
      return true;
    }

    // Normal users can only read their own user record
    return req.user.id === id;
  },

  update: ({ req }) => req.user?.role === "admin",

  delete: ({ req }) => req.user?.role === "admin",

  admin: ({ req }) => req.user?.role === "admin",
},

  fields: [
    {
      name: "name",
      type: "text",
    },

    {
      name: "role",
      type: "select",
      required: true,

      defaultValue: "user",

      options: [
        {
          label: "User",
          value: "user",
        },
        {
          label: "Admin",
          value: "admin",
        },
      ],

      access: {
        // Only an authenticated admin can explicitly set a role.
        create: ({ req }) => req.user?.role === "admin",
        update: ({ req }) => req.user?.role === "admin",
      },
    },
  ],

  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Never allow public registration to create an admin.
        if (req.user?.role !== "admin") {
          data.role = "user";
        }

        return data;
      },
    ],
  },
};