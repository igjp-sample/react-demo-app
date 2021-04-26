type Names = {
    lang: string;
    maleNames: string[];
    femaleNames: string[];
    lastNames: string[];
}

export class DockManagerSharedData {

    public static async getStudents(count?: number, lng?: string): Promise<any[]> {

        const currentLangNames = await fetch('https://igjp-sample.github.io/DummyData/Data/Names.json')
            .then(res => res.json())
            .then((out) => {
                const res = out.filter(function(item: any) {
                    return Object.keys(item).some((key) => item[key].includes(lng));
                });
                return res[0];
            }).catch(err => console.error(err));

        if (count === undefined) {
            count = 250;
        }

        const contacts: any[] = [];

        for (let i = 0; i < count; i++) {

            const gender: string = this.getRandomGender();
            const firstName: string = this.getRandomNameFirst(gender,currentLangNames);
            const lastName: string = this.getRandomNameLast(currentLangNames);
            const classNumber: number = Math.round(this.getRandomNumber(1, 9));

            let person: any = {};

            person.ID = this.pad(i + 1, 5);
            if (lng == "en-US") {
                person.Name = firstName + " " + lastName;
            } else {
                person.Name = lastName + " " + firstName;
            }
            person.ClassNumber = classNumber;
            person.Results = [];

            for (let m = 0; m < 12; m++) {
                person.Results[m] = {
                    "Month": m + 1,
                    "Subject1": Math.round(this.getRandomNumber(40, 100)),
                    "Subject2": Math.round(this.getRandomNumber(40, 100)),
                    "Subject3": Math.round(this.getRandomNumber(40, 100)),
                    "Subject4": Math.round(this.getRandomNumber(40, 100)),
                    "Subject5": Math.round(this.getRandomNumber(40, 100))
                }
            }

            contacts.push(person);
        }
        return contacts;
    }

    private static genders: string[] = ["male", "female"];

    private static getRandomNumber(min: number, max: number): number {
        return Math.round(min + Math.random() * (max - min));
    }

    private static getRandomItem(array: any[]): any {
        const index = Math.round(this.getRandomNumber(0, array.length - 1));
        return array[index];
    }

    private static getRandomDate(start: Date, end: Date) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    private static getRandomPhone(): string {
        const phoneCode = this.getRandomNumber(100, 900);
        const phoneNum1 = this.getRandomNumber(100, 900);
        const phoneNum2 = this.getRandomNumber(1000, 9000);
        const phone = phoneCode + "-" + phoneNum1 + "-" + phoneNum2;
        return phone;
    }

    private static getRandomGender(): string {
        return this.getRandomItem(this.genders);
    }

    private static getRandomNameLast(names: Names): string {
        return this.getRandomItem(names.lastNames);
    }

    private static getRandomNameFirst(gender: string, names: Names): string {
        if (gender === "male") {
            return this.getRandomItem(names.maleNames);
        }
        else {
            return this.getRandomItem(names.femaleNames);
        }
    }

    private static getBirthday(age: number): Date {
        const today: Date = new Date();
        const year: number = today.getFullYear() - age;
        const month: number = this.getRandomNumber(0, 8);
        const day: number = this.getRandomNumber(10, 27);
        return new Date(year, month, day);
    }

    private static pad(num: number, size: number) {
        let s = num + "";
        while (s.length < size) {
            s = "0" + s;
        }
        return s;
    }

}