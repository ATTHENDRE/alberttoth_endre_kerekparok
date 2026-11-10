import { useEffect, useState } from "react";

const Url = "./public/kerekparok.json"

type kerekpar = {
    id : number,
    nev : string,
    tipus : string,
    napiDij : number,
    szin: string
}




export default function Kerekpar(){
    const [bicikli, setBicikli] = useState<kerekpar[]>([])

    

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await fetch(Url)
                const data:kerekpar[] = await response.json()
                setBicikli(data)
            } catch (error) {
                console.error("Hiba a kerékpárok betöltésekor:", error)
            }
        }
        fetchData()
    },[])




    const kerekParokSzama = bicikli.length


    let olcso = bicikli[0]

    for (const item of bicikli) {
        if (item.napiDij < olcso.napiDij){
            olcso = item
        }
    }

    let draga = bicikli[0]

    for (const item of bicikli) {
        if (item.napiDij > draga.napiDij){
            draga = item
        }
    }

    


    return(
    <>
        <h2>Kiadó</h2>

        <div>
            {bicikli.map((kerekpar) => (
                <div className="card">
                    <div className="card-body">
                        <div key={kerekpar.id}>
                        <h3 style={{ color: kerekpar.szin }} className="card-title">{kerekpar.nev}</h3>
                        <p className="card-text">{kerekpar.tipus}</p>
                        <p className="card-text">{kerekpar.napiDij}</p>
                        <button>Részletek</button>
                        </div>
                    </div>
                </div>
                ))}
        </div>

        <p>Kerekparok szama: {kerekParokSzama}</p>

        <p>Legolcsóbb: {olcso?.nev} - {olcso?.napiDij}</p>
        <p>Legdrágabb: {draga?.nev} - {draga?.napiDij}</p>

        
        
    </>
)}




