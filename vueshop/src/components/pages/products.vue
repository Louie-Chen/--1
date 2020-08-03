<template>
<div>
     <loading :active.sync="isLoading" ></loading>
    <div class="text-right mt-4">
    <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="90">原價</th>
                <th width="90">售價</th>
                <th width="100">是否啟用</th>
                <th width="100">編輯</th>
                <th width="100">刪除</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,key) in products" :key="key">
                <td>{{ item.category }}</td>
                <td>{{ item.title }}</td>
                <td class="text-right">
                {{ item.origin_price | currency }}
                </td>
                <td class="text-right">
                {{ item.price | currency}}
                </td>
                <td>
                    <span v-if="item.is_enabled" class="text-success">啟用</span>
                    <span v-else>未啟用</span>
                </td>
                <td>
                    <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
                </td>
                <td>
                     <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
                </td>
            </tr>
        </tbody>
    </table>
    <pagination :pages='pagination' @changedpage="getproducts"></pagination>
    <!-- Modal -->
    
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                        placeholder="請輸入圖片連結" v-model="tempproduct.imageUrl">
                    </div>
                    <div class="form-group">
                    <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                        ref="files" @change="uploadfile">
                    </div>
                    <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid" alt="" :src="tempproduct.imageUrl">
                </div>
                <div class="col-sm-8">
                    <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title"
                        placeholder="請輸入標題" v-model="tempproduct.title">
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category"
                        placeholder="請輸入分類" v-model="tempproduct.category">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit"
                        placeholder="請輸入單位" v-model="tempproduct.unit">
                    </div>
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                        <input type="number" class="form-control" id="origin_price"
                        placeholder="請輸入原價" v-model="tempproduct.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price"
                        placeholder="請輸入售價" v-model="tempproduct.price">
                    </div>
                    </div>
                    <hr>

                    <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description"
                        placeholder="請輸入產品描述" v-model="tempproduct.description"></textarea>
                    </div>
                    <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content"
                        placeholder="請輸入產品說明內容" v-model="tempproduct.content"></textarea>
                    </div>
                    <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                        id="is_enabled" v-model="tempproduct.is_enabled"
                        :true-value="1"
                        :false-value="0">
                        <label class="form-check-label" for="is_enabled">
                        是否啟用
                        </label>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateproduct">確認</button>
            </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                是否刪除 <strong class="text-danger">{{ tempproduct.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="delModalcheak"
                >確認刪除</button>
            </div>
            </div>
        </div>
        </div>
 
    
</div>

</template>
<script>
import $ from 'jquery';
import pagination from '../pagination';

export default {
    components:{
        pagination,
    },
    data(){
        return{
            products:[],
            tempproduct:{},
            pagination:{},
            isnew:false,
            isLoading:false,
            status:{
                fileUploading:false,
                
            }
        };
    },
    methods:{
        getproducts(page = 1){
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/products?page=${ page }`;
            const vm = this;
            console.log(api);
            console.log( process.env.APIisLoadingPATH,process.env.CUSTOMPATH);
            vm.isLoading = true;
            this.$http.get(api).then((response)=>{
            console.log(response.data);
            vm.isLoading = false;
            vm.products=response.data.products;
            vm.pagination=response.data.pagination;
            
            });
        },
        openModal(isnew,item){
            
            if(isnew){
                this.tempproduct = {};
                this.isnew=true;
            }else{
                this.tempproduct = Object.assign({},item);
                this.isnew=false;
            }
            $('#productModal').modal('show');
        },
        delModal(item){
            this.tempproduct=item;
            $('#delProductModal').modal('show');
        },
        delModalcheak(){
            const vm = this;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/admin/product/${ vm.tempproduct.id}`;
            console.log(api);
            this.$http.delete(api).then((response)=>{
                console.log(response.data);
                if(response.data.sucess){
                     $('#delProductModal').modal('hide');
                     vm.getproducts();
                }else{
                    $('#delProductModal').modal('hide');
                    vm.getproducts();
                    console.error('刪除失敗');
                }
            });
            
        },
        uploadfile(){
            console.log(this);
            const uploadedfile=this.$refs.files.files[0];
            const vm = this;
            const formdata = new FormData();
            formdata.append('file-to-upload', uploadedfile);
            const url = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/admin/upload`;
            vm.status.fileUploading = true;
            this.$http.post(url,formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
                }).then((response)=>{
                    vm.status.fileUploading = false;
                    console.log(response.data);
                    if(response.data.success){
                        // vm.tempproduct.imageUrl=response.data.imageUrl;
                        // console.log(vm.tempproduct);
                        vm.$set(vm.tempproduct, 'imageUrl',response.data.imageUrl);    
                        
                    }else{
                        this.$bus.$emit('messsage:push', response.data.message, 'danger');
                    }
                })
        },
        updateproduct(){
            let api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/admin/product`;
            let httpmethods = 'post';
            const vm = this;
            if(!vm.isnew){
                
                api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/admin/product/${ vm.tempproduct.id}`;
                httpmethods='put';
            }
            
            this.$http[httpmethods](api, { data:vm.tempproduct }).then((response)=>{
            console.log(response.data);
            if(response.data.success){
                $('#productModal').modal('hide');
                vm.getproducts();
            }else{
                $('#productModal').modal('hide');
                vm.getproducts();
                console.log('新增失敗');
            }
            
            });
        }
    },
    created(){
        this.getproducts();
    },
    
}
</script>