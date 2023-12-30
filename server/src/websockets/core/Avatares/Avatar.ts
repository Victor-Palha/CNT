type Avatars = {
    id_avatar: string;
    name: string;
    description: string;
    image: string;
    set_avatar: string;
    unique_ability: string;
    passive_ability: string | null;
    hit_points: number;
    attack: number;
    defense: number;
    type_avatar: "OFENSIVO" | "DEFENSIVO" | "MODERADO";
    created_at: Date;
    updated_at: Date;
}

export class Avatar{
    private id_avatar: string;
    private name: string;
    private description: string;
    private image: string;
    private set_avatar: string;
    private unique_ability: string;
    private passive_ability: string | null;
    private hit_points: number;
    private attack: number;
    private defense: number;
    private type_avatar: "OFENSIVO" | "DEFENSIVO" | "MODERADO";
    private created_at: Date;
    private updated_at: Date;

    constructor({id_avatar, name, description, image, set_avatar, unique_ability, passive_ability, hit_points, attack, defense, type_avatar, created_at, updated_at}: Avatars){
        this.id_avatar = id_avatar;
        this.name = name;
        this.description = description;
        this.image = image;
        this.set_avatar = set_avatar;
        this.unique_ability = unique_ability;
        this.passive_ability = passive_ability;
        this.hit_points = hit_points;
        this.attack = attack;
        this.defense = defense;
        this.type_avatar = type_avatar;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    get atk(){
        return this.attack;
    }

    set atk(value: number){
        this.attack = value;
    }

    get def(){
        return this.defense;
    }
    get hp(){
        return this.hit_points;
    }

    set hp(value: number){
        this.hit_points = value;
    }

    set changeHitPoints(value: number){
        if(value < 0){
            this.hit_points = this.hit_points - Math.abs(value);
        }else{
            this.hit_points -= value;
        }
    }

    set changeAttack({value, type} : {value: number, type: "increase" | "decrease"}){
        if(type === "increase"){
            this.attack += value;
        }
        else{
            this.attack -= value;
        }
    }

    set changeDefense({value, type} : {value: number, type: "increase" | "decrease"}){
        if(type === "increase"){
            this.defense += value;
        }
        else{
            this.defense -= value;
        }
    }

    get type(){
        return this.type_avatar;
    }
}