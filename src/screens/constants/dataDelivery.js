export const DELIVERY_ITEMS = [
    {
        id: '1',
        status: 'In Progress',
        location: 'San Francisco, CA',
        store: 'Walmart',
        nextRoute: [
            'San Francisco, CA - Market Street',
            'San Francisco, CA - 1st Street',
            'San Francisco, CA - Mission Street',
        ],
        date: 'Feb 12, 2024 - Feb 12, 2024',
        time: '2:30 PM - 4:00 PM',
        routes: '3',
        bodyNumber: 'TRK-1023',
        driver: 'John Doe',
        plateNumber: '7ABC123',
        routeCoordinates: [
            { latitude: 37.7833, longitude: -122.4167, name: 'Market Street' },
            { latitude: 37.7846, longitude: -122.4017, name: '1st Street' },
            { latitude: 37.7900, longitude: -122.4200, name: 'Mission Street' },
        ],
    },
    {
        id: '2',
        status: 'New',
        location: 'San Francisco, CA',
        store: 'Target',
        nextRoute: [
            'San Francisco, CA - Pier 39',
            'San Francisco, CA - Fisherman’s Wharf',
        ],
        date: 'Feb 11, 2024 - Feb 12, 2024',
        time: '3:45 PM - 4:00 PM',
        routes: '2',
        bodyNumber: 'TRK-2048',
        driver: 'Jane Smith',
        plateNumber: '6XYZ789',
        routeCoordinates: [
            { latitude: 37.8080, longitude: -122.4098, name: 'Pier 39' },
            { latitude: 37.8051, longitude: -122.4052, name: 'Fisherman’s Wharf' },
        ],
    },
    {
        id: '3',
        status: 'Completed',
        location: 'San Francisco, CA',
        store: 'Best Buy',
        nextRoute: [
            'San Francisco, CA - Golden Gate Bridge',
            'San Francisco, CA - Fort Point',
            'San Francisco, CA - Crissy Field',
            'San Francisco, CA - Presidio Park',
        ],
        date: 'Feb 10, 2024 - Feb 12, 2024',
        time: '1:15 PM - 4:00 PM',
        routes: '4',
        bodyNumber: 'TRK-3087',
        driver: 'Alex Johnson',
        plateNumber: '8LMN456',
        routeCoordinates: [
            { latitude: 37.8199, longitude: -122.4783, name: 'Golden Gate Bridge' },
            { latitude: 37.8197, longitude: -122.4780, name: 'Fort Point' },
            { latitude: 37.8100, longitude: -122.4820, name: 'Crissy Field' },
            { latitude: 37.7998, longitude: -122.4750, name: 'Presidio Park' },
        ],
    },
    {
        id: '4',
        status: 'In Progress',
        location: 'San Francisco, CA',
        store: 'Costco',
        nextRoute: ['San Francisco, CA - Twin Peaks'],
        date: 'Feb 9, 2024 - Feb 12, 2024',
        time: '3:00 PM - 4:00 PM',
        routes: '1',
        bodyNumber: 'TRK-4012',
        driver: 'Michael Lee',
        plateNumber: '9PQR678',
        routeCoordinates: [
            { latitude: 37.7544, longitude: -122.4477, name: 'Twin Peaks' },
        ],
    },
    {
        id: '5',
        status: 'New',
        location: 'San Francisco, CA',
        store: "Sam's Club",
        nextRoute: [
            'San Francisco, CA - Alamo Square',
            'San Francisco, CA - Painted Ladies',
            'San Francisco, CA - Divisadero St',
            'San Francisco, CA - Golden Gate Park',
            'San Francisco, CA - Civic Center Plaza',
        ],
        date: 'Feb 8, 2024 - Feb 12, 2024',
        time: '11:00 AM - 2:00 PM',
        routes: '5',
        bodyNumber: 'TRK-5093',
        driver: 'Emily Davis',
        plateNumber: '3STU987',
        routeCoordinates: [
            { latitude: 37.7764, longitude: -122.4346, name: 'Alamo Square' },
            { latitude: 37.7742, longitude: -122.4360, name: 'Painted Ladies' },
            { latitude: 37.7800, longitude: -122.4274, name: 'Divisadero St' },
            { latitude: 37.7773, longitude: -122.4393, name: 'Golden Gate Park' },
            { latitude: 37.7835, longitude: -122.4192, name: 'Civic Center Plaza' },
        ],
    },
    {
        id: '6',
        status: 'Cancelled',
        location: 'San Francisco, CA',
        store: 'Kroger',
        nextRoute: [
            'San Francisco, CA - The Castro',
            'San Francisco, CA - Market & Castro',
        ],
        date: 'Feb 7, 2024 - Feb 12, 2024',
        time: '9:00 AM - 10:00 AM',
        routes: '2',
        bodyNumber: 'TRK-6015',
        driver: 'Robert Wilson',
        plateNumber: '5VWX234',
        routeCoordinates: [
            { latitude: 37.7601, longitude: -122.4350, name: 'The Castro' },
            { latitude: 37.7598, longitude: -122.4376, name: 'Market & Castro' },
        ],
    },
];
