function CopyMain(){
	const elements = document.getElementsByTagName("copycat")
	for (let index = 0; index < elements.length; index++){
		console.log(index)
		const element = elements[index]
		const name = element.getAttribute("src")
		const Referred = document.getElementById(name)
		if (Referred != null && Referred != undefined){
			const Copycat = document.createElement(Referred.tagName)
			const Names = Referred.getAttributeNames()
			for(const index2 in Names){
				const Attribute = Names[index2]
				if (Attribute == "id"){
					continue
				}
				const Current = element.getAttribute(Attribute)
				console.log("Currently addressing \""+Attribute+"\"")
				console.log("Copycat value: "+Current)
				console.log("Copied value:  "+Referred.getAttribute(Attribute))
				if (Current == null || Current == "" || Attribute == "src"){
					Copycat.setAttribute(Attribute,Referred.getAttribute(Attribute).trim())
				} else {
					Copycat.setAttribute(Attribute,Current.trim())
				}
			}
			Copycat.innerHTML = Referred.innerHTML
			element.insertAdjacentElement("beforebegin",Copycat)
		} else {
			console.warn("Couldn't find element #"+name)
		}
	}
}

CopyMain()