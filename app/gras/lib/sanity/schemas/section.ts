import { defineField, defineType } from 'sanity';

export default defineType({
  title: 'Section',
  name: 'section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'excerpt2',
      title: 'Excerpt',
      type: 'reference',
      to: [{ type: 'post' }],
      weak: true,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
});
