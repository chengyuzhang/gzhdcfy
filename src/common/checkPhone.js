function checkPhone(val){
	if(!(/^1[3456789]\d{9}$/.test(val))){
		return false
	}
	return true
}

export default checkPhone