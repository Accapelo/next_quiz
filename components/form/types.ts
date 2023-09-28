export interface office {
    title: {
        rendered: string
    },
    acf: {
        hr_manager: [
            {
                ID: number,
                post_author: string,
                post_date: string,
                post_date_gmt: string,
                post_content: string,
                post_title: string,
                post_excerpt: string,
                post_status: string,
                comment_status: string,
                ping_status: string,
                post_password: string,
                post_name: string,
                to_ping: string,
                pinged: string,
                post_modified: string,
                post_modified_gmt: string,
                post_content_filtered: string,
                post_parent: number,
                guid: string,
                menu_order: number,
                post_type: string,
                post_mime_type: string,
                comment_count: string,
                filter: string
            }
        ],
        map: {
            city: string,
            address: string,
            lat: number,
            lng: number,
            zoom: number,
            place_id: string,
            name: string,
            street_number: string,
            street_name: string,
            state: string,
            post_code: string,
            country: string,
            country_short: string
        }
    }
}

export interface submitInfo{
    firstName: string, 
    lastName: string, 
    email: string, 
    office: string,
    score: number
}