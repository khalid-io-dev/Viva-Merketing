import orga1 from '../../../../ressources/images/footer/img.png'
import orga2 from '../../../../ressources/images/footer/img_2.png'
import orga3 from '../../../../ressources/images/footer/img_3.png'
import orga4 from '../../../../ressources/images/footer/img_4.png'
import orga5 from '../../../../ressources/images/footer/img_5.png'


export default function OrgaPartner(){
    const orgas = [orga1, orga2, orga3, orga4, orga5];
return (
    <div className="flex flex-row">
        {orgas.map((_item , index) => (
            <div className=" h-full w-full">
                <img
                    src={orgas[index]}
                    className="w-14"
                    alt={"orga partner " + index}
                />
            </div>
        ))}
    </div>
)
}