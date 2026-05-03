import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      // required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      // required: true,
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      type: "row",

      fields: [
        {
          name: "livePreview",
          type: "text",
          defaultValue: "",
          validate: (value: string | null | undefined) => {
            try {
              value && new URL(value);
              return true;
            } catch (e) {
              return "Live preview must be a valid URL";
            }
          },
        },
        {
          name: "sourceCode",
          type: "text",
          validate: (value: string | null | undefined) => {
            try {
              value && new URL(value);
              return true;
            } catch (e) {
              return "Source code must be a valid URL";
            }
          },
        },
      ],
    },
    {
      name: "techStack",
      type: "relationship",
      relationTo: "tech-stack",
      hasMany: true,
    },
    {
      name: "challenge",
      type: "richText",
      localized: true,
      editor: lexicalEditor(),
    },
    {
      name: "solution",
      type: "richText",
      localized: true,
      editor: lexicalEditor(),
    },
    {
      name: "highlights",
      type: "array",
      maxRows: 2,
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "text",
        },
      ],
    },
    {
      name: "features",
      type: "array",
      maxRows: 4,
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "text",
        },
      ],
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      hasMany: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "POC (Proof of Concept)",
          value: "poc",
        },
        {
          label: "MVP (Minimum Viable Product)",
          value: "mvp",
        },
        {
          label: "Prototype",
          value: "prototype",
        },
        {
          label: "Production",
          value: "production",
        },
        {
          label: "Beta",
          value: "beta",
        },
      ],
      defaultValue: "poc",
      required: true,
    },
  ],
};
