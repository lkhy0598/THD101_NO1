const app = Vue.createApp({
    data() {
        return {
            checksessionResponse: '',
            shoppingCartItems: [], // 购物车项数据
            vouchers:[],
            selectedVoucher: '', // 选中的优惠劵值（VOUCHER_ID）
            selectedVoucherName: '', // 选中的优惠劵名称
            // isVoucherEnabled: true, // 是否启用VOUCHER_ID=2的优惠劵，默认为true
            // isCartTotalValid: false, // 是否购物车金额超过3000的标志位
            shippingFee: 60,
            isShippingFree: false,
            selectedPayment: '',
            selectedDeliveryMethod: '',
        };
    },
    created() {
        const storedData = JSON.parse(localStorage.getItem('cartItems')); // 将localStorage中的数据解析为JavaScript对象
        if (storedData && Array.isArray(storedData)) {
            this.shoppingCartItems = storedData;
        }
        this.searchProducts(); // 在确认shoppingCartItems数组被正确填充后调用searchProducts方法
        // console.log(storedData);

// ===========================================================
    $.ajax({
        url: 'http://localhost/THD101_NO1/php/checksession.php',
        type: 'POST',
        dataType: 'text',
        success: response => {
            this.checksessionResponse = response;
            if (response === 'notlogin') {
                // 用户未登录，禁用下拉列表
                $('#CUPON').prop('disabled', true);
            } else {
                // 用户已登录，启用下拉列表
                $('#CUPON').prop('disabled', false);

                // 将member_id传递给另一个PHP文件进行处理
            const member_id = response.trim(); // 去除字符串两端的空格并获取member_id值

                $.ajax({
                    url: 'http://localhost/THD101_NO1/php/cartmember_voucher.php',
                    type: 'POST',
                    data: { member_id: member_id },
                    dataType: 'json',
                    success: response => {
                        // 处理cartmember_voucher.php的响应
                        // console.log(response);
                        this.vouchers = response;
                        // console.log(this.vouchers);
                    },
                    error: error => {
                        // 处理错误
                        console.error(error);
                    }
                });
            }
        },
        error: error => {
            // 处理错误
        }
    });

    },
    methods: {
        searchProducts() {
            const productIds = this.shoppingCartItems.map(item => item.PRODUCT_ID);
            $.ajax({
                url: 'http://localhost/THD101_NO1/php/shopping_cart.php',
                type: 'GET',
                dataType: 'json',
                data: {
                ids: JSON.stringify(productIds) // 将所有的productId组成的数组转换为JSON字符串并作为参数传递给PHP
                },
                success: response => {
                    const inventoryData = response; // 假设响应数据是一个包含了产品 ID 和对应的 INVENTORY 值的数组
                    // 遍历购物车项数组
                    this.shoppingCartItems.forEach(item => {
                        const productId = item.PRODUCT_ID;

                        // 查找相应的 INVENTORY 值并设置给购物车项对象
                        const inventory = inventoryData.find(data => data.PRODUCT_ID === productId);
                        if (inventory) {
                        item.INVENTORY = inventory.INVENTORY;
                        }
                    });
                    this.checkInventory(); // 在成功获取库存数据后执行库存判断
                },
                error: error => {
                    console.error(error);
                }
            });
        },
        checkInventory() {
            this.shoppingCartItems.forEach((item, index) => {
                if (item.INVENTORY === 0) {
                    this.deleteItem(index);
                    window.alert('部分商品已售完，已自動刪除商品');
                } else if (item.quantity > item.INVENTORY) {
                    item.quantity = item.INVENTORY;
                    this.updateLocalStorageQuantity();
                    window.alert('部分商品庫存不足，已自動調整為最大庫存');
                }
            });
            // 计算购物车金额是否超过3000
            const cartTotal = this.cartItemSubtotal;
            this.isCartTotalValid = cartTotal >= 3000;
        },
        getFirstImage(imageSourceArray) {
            if (Array.isArray(imageSourceArray) && imageSourceArray.length > 0) {
                return imageSourceArray[0];
            }
            return ''; // 如果没有图像路径，则返回一个空字符串或默认的图像路径
        },
        getImagesArray(imageSource) {
            if (imageSource) {
              // 处理图像路径，返回图像路径数组
              // 这里只是一个示例，您需要根据实际情况进行处理
                return imageSource.split(',');
            }
            return []; // 如果没有图像路径，则返回一个空数组
        },
        deleteItem(index) {
            this.shoppingCartItems.splice(index, 1); // 从数组中删除指定索引的项

            // 更新localStorage中的数据
            localStorage.setItem('cartItems', JSON.stringify(this.shoppingCartItems));
        },
        updateSubtotal(item) {
            const price = parseFloat(item.PRODUCT_PRICE);
            const quantity = parseInt(item.quantity);
            const subtotal = price * quantity;
            item.subtotal = subtotal;
        },
        incrementQuantity(item) {
            if (item.quantity < item.INVENTORY) {
                item.quantity++;
                this.updateLocalStorageQuantity(); // 更新localStorage中的quantity
            } else {
                window.alert('已超出商品庫存');
            }
        },
        decrementQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--;
                this.updateLocalStorageQuantity(); // 更新localStorage中的quantity
            }
        },
        // updateLocalStorage() {
        //     localStorage.setItem('cartItems', JSON.stringify(this.shoppingCartItems));
        // }
        updateLocalStorageQuantity() {
            const updatedItems = this.shoppingCartItems.map(item => {
                return {
                    ...item,
                    subtotal: parseFloat(item.PRODUCT_PRICE) * parseInt(item.quantity) // 计算新的subtotal
                };
            });
        
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        },
        isVoucherDisabled(voucherId) {
            if (this.cartItemSubtotal < 1000 && voucherId === 1) {
              return true; // 购物车金额低于1000且优惠券ID为1时禁用
            } else if (this.cartItemSubtotal < 3000 && voucherId === 2) {
              return true; // 购物车金额低于3000且优惠券ID为2时禁用
            }
            return false; // 其他情况不禁用
        },
        handleClick() {
            if (this.checksessionResponse === 'notlogin') {
                $('.LOGIN').click();
        
              return; // 停止执行保存到localStorage的操作
            }
        
            // 获取选择的值和总金额
            const voucherId = this.selectedVoucher;
            const paymentId = this.selectedPayment;
            const deliveryMethodId = this.selectedDeliveryMethod;
            const total = this.cartItemTotal;
        
            // 检查 PAYMENT_ID、DELIVERY_METHOD_ID 和 TOTAL 是否为空值
            if (!paymentId || !deliveryMethodId || !total) {
              // 执行相应的错误处理逻辑，例如提示用户选择完整信息
              // 这里可以根据实际情况自行处理
              return; // 停止执行保存到本地存储的操作
            }
        
            // 存储到本地存储
            localStorage.setItem('order', JSON.stringify({
                VOUCHER_ID: voucherId,
                PAYMENT_ID: paymentId,
                DELIVERY_METHOD_ID: deliveryMethodId,
                TOTAL: total,
              // 其他需要存储的值
            }));

            // 执行页面跳转
            window.location.href = './shopping_cartp2.html';
        }
    },
    computed: {
        cartItemSubtotal() {
            let subtotal = 0;
            this.shoppingCartItems.forEach(item => {
                const price = parseFloat(item.PRODUCT_PRICE);
                const quantity = parseInt(item.quantity);
                subtotal += price * quantity;
            });

            if (subtotal < 1000) {
                this.selectedVoucher = '';
            }
            if (subtotal > 1000) {
                const hasVoucher1 = this.vouchers.some(voucher => voucher.VOUCHER_ID === 1);
                if (hasVoucher1) {
                  this.selectedVoucher = 1; // 如果选项中有 VOUCHER_ID 为 1 的优惠券，将 selectedVoucher 设置为 1
                } else {
                  this.selectedVoucher = ''; // 如果选项中没有 VOUCHER_ID 为 1 的优惠券，将 selectedVoucher 设置为空字符串
                }
            }
            if (subtotal > 3000) {
                const hasVoucher2 = this.vouchers.some(voucher => voucher.VOUCHER_ID === 2);
                const hasVoucher1 = this.vouchers.some(voucher => voucher.VOUCHER_ID === 1);
                
                if (hasVoucher2) {
                  this.selectedVoucher = 2; // 如果选项中有 VOUCHER_ID 为 2 的优惠券，将 selectedVoucher 设置为 2
                } else if (hasVoucher1) {
                  this.selectedVoucher = 1; // 如果选项中有 VOUCHER_ID 为 1 的优惠券，将 selectedVoucher 设置为 1
                } else {
                  this.selectedVoucher = ''; // 如果选项中既没有 VOUCHER_ID 为 2 的优惠券，也没有 VOUCHER_ID 为 1 的优惠券，将 selectedVoucher 设置为空字符串
                }
            }
            

            return subtotal;

        },
        cartItemTotal() {
            let total = this.cartItemSubtotal;
        
            if (this.selectedVoucher === '') {
              total += this.shippingFee; // 没有选择优惠券时，加上运费
            } else if (this.selectedVoucher === 1) {
                total += this.shippingFee;
                total -= this.shippingFee;
            } else if (this.selectedVoucher === 2) {
                total = Math.floor(total * 0.8 + this.shippingFee);
            }
        
            return total;
        },
        discountedShippingFee() {
            if (this.selectedVoucher === 1) {
              return 0; // 当选择的优惠券ID为1时，将运费金额修改为0
            } else {
              return this.shippingFee; // 其他情况下保持原始的运费金额
            }
        }
    },
    watch: {
        selectedVoucher(value) {
          // 根据选中的优惠劵ID更新选中的优惠劵名称
            const selectedVoucher = this.vouchers.find(
                voucher => voucher.VOUCHER_ID === value
            );
            this.selectedVoucherName = selectedVoucher
                ? selectedVoucher.VOUCHER_NAME
                : "";
        }
        
    }
    
    });

app.mount("#SHOPPINGCARTVUE");