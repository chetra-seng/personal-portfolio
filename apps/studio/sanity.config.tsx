import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
// @ts-ignore
import {theme} from 'https://themer.sanity.build/api/hues'

const Logo = () => {
  return <img src={'/static/logo.png'} alt="brand logo" style={{height: '100%', width: '100%'}} />
}

export default defineConfig({
  name: 'default',
  title: 'personal-portfolio',
  icon: Logo,
  projectId: 'j493y206',
  dataset: 'production',
  theme,
  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
