import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Button,Tab,Tabs,Form,Field,CellGroup,Picker,Popup,Col,Row,Divider,Image,Tabbar,TabbarItem,Step,Steps,Toast,Uploader,Calendar,Checkbox,CheckboxGroup,Radio,RadioGroup } from 'vant';
import pinia from './stores'

import '@/styles/global.scss'
import App from './App.vue'
import router from './router'
import persist from 'pinia-plugin-persistedstate'

// 样式全局使用
import '@vant/touch-emulator';
import 'vant/lib/index.css'
import '@/styles/variables.scss'
import { Icon } from 'vant';


const app = createApp(App)
app.use(createPinia().use(persist))

app.use(createPinia())

app.use(pinia);
app.use(router);
app.use(Button);
app.use(Tab);
app.use(Tabs);
app.use(Icon);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Picker);
app.use(Popup);
app.use(Col);
app.use(Row);
app.use(Divider);
app.use(Image);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Step);
app.use(Steps);
app.use(Toast);
app.use(Uploader);
app.use(Calendar);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(Radio);
app.use(RadioGroup);

app.mount('#app')
