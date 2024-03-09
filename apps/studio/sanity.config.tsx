import {defineConfig} from '@personal-portfolio/sanity'
import {structure} from '@personal-portfolio/sanity'
import {visionTool} from '@sanity/vision'
// @ts-ignore
import {theme} from 'https://themer.sanity.build/api/hues'
import {schemaTypes} from '@personal-portfolio/sanity'

const Logo = () => {
  return <img src={'/static/logo.png'} alt="brand logo" style={{height: '100%', width: '100%'}} />
}

export default defineConfig({
  name: 'default',
  title: 'personal-portfolio',
  icon: Logo,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_API_DATASET as string,
  theme,
  plugins: [structure.structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
