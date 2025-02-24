var Main = null

function Insert(Element){
	Main.insertAdjacentElement("beforeend",Element)
}

function GenHeader(Name,Desc){
	let Title = document.createElement("h2")
	Title.textContent = Name
	Insert(Title)
	if (Desc != null && Desc != undefined && Desc.trim() != "") {
		let DescP = document.createElement("p")
		DescP.textContent = Desc
		Insert(DescP)
	}
}

function GenCell(Image,Name,Price){
	if (Image.trim() == ""){
		Image = "https://freight.cargo.site/t/original/i/ea4345e8b5391326d89870d8d3e2eefa263acc4bb2c55856375e4736b3b8dccb/ezgif-6-db5716448fb4.gif"
	}
	let Cell = document.createElement("slot")
	let Img = document.createElement("img")
	let Desc = document.createElement("p")
	Img.src = Image
	Desc.textContent = Name + ": "+Price+"$"
	Cell.insertAdjacentElement("beforeend",Img)
	Cell.insertAdjacentElement("beforeend",Desc)
	return Cell
}

function Generate(Txt){
	Main = document.getElementById("PizzaContainer")
	if (Main == null){
		return
	}
	let JSONParsed = JSON.parse(Txt)
	for (let Table in JSONParsed){
		GenHeader(Table,JSONParsed[Table].Notice)
		let NewTable = document.createElement("div")
		NewTable.className = "Grid"
		for (let CellData in JSONParsed[Table]){
			if (CellData == "Notice"){
				continue
			}
			let Current = JSONParsed[Table][CellData]
			let Cell = GenCell(Current.Img,CellData,Current.Precio)
			NewTable.insertAdjacentElement("beforeend",Cell)
		}
		Insert(NewTable)
	}
}

fetch("data/Products.json").then(Doc => {
	Doc.text().then(Generate)
})