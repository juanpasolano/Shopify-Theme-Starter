### Folder structure
```bash
├── src                 # → Contains all the source files
│   ├── styles 
│   └── scripts
├── theme               # → The shopify theme
│   └──  assets         # → This is where the build system compiles 
├── config.sample.yml 	# → A sample file to configure theme kit
└── webpack.config.js 	# → The webpack configuration file
```

### Instalation and Usage
1. Install dependencies
```bash
yarn install
```
2. Make a copy of the `config.sample.yml` file, rename it to `config.yml` and add the appropriate values to it.

3. Start the build and theme kit watch
```bash
yarn start
```

### Other useful commands

```bash
# Build the theme for production
yarn build:production

# Replace the theme
# Sometimes you want to make sure all changes are in a theme.
# Defaults to the development theme to avoid danger
yarn theme:replace

# Zip the theme folder to upload
# After running it you should have a theme.zip in the root folder 
# to upload to the store if needed
yarn zip

# Open the development theme preview.
# sometimes is a pain to keep going to shopify store to open the preview 
# of your development theme
yarn open

# Sometimes webpack and shopify dont play nice and you might find some JS files
# do not load as intendent. 
# 
# Uncaught (in promise) ChunkLoadError: Loading chunk <file> failed
#
# To solve this issue try running this instead of the yarn:start command 
yarn start:cache

```
