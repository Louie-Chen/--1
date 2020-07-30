<template>
<div>

<navbar/>
<Alert></Alert>
<div class="container-fluid">
  <div class="row">
    <sidebar></sidebar>
    
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <router-link to="/products">products</router-link>
      <br/>
      
      <router-view></router-view>
    </main>
  </div>
</div>
</div>
</template>

<script>
import sidebar from './sidebar';
import navbar from './navbar';
import Alert from './AlertMessage';

export default{
  components:{
    sidebar,
    navbar,
    Alert,
    
  }
};
</script>