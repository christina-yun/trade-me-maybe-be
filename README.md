# Trade Me Maybe Backend

Trade Me Maybe is meant to be a pin database and a platform where pin collectors can list their traders, what they're in search of, and find people to trade with.

## List My Traders in One Place

- List my own pins for trade
- Add my pins' information to a database if it doesn't exist yet
- Add their own notes to their listing that don't get captured in the pin database
- List my pinsta handle for others to reach out
- List My D/ISOs in One Place

Make a list of all the pins on my ISO list
DISOs should be starred and rise to the top of the list
Default display is for list to be in alphabetical order
Tickbox saying I'm open to trading for pins other than my ISOs
This will make my pins open for others searching for that pin but who don't have the pins I'm ISO
Automatically apply all these pins as 'Will Trade For' to your traders
Additional functionality later: Ability to modify individual pins as trading only for certain ISOs
Search For My ISOs

General search will apply to searching for all of that pin listed for trade
General search will look to match words in titles and descriptions
Pins will be displayed by date listed
Advanced search filters
Checkbox: List only pins that are ISO my traders
Match by:
Maker
Pin name
Add Pins to the Database

Name of pin
Please enter the name of this pin
Maker of pin
Please enter the maker of this pin
Variant name
Please enter the variant of this pin (if there is currently only one variant, write 'OG')
Picture of pin
Please make sure it's a picture of the whole pin. Photo should be focused, well-lit and clear

##  https://trade-me-maybe.herokuapp.com/

### TABLES
#### Users:
```JSON
{
    "user_id": "int",
    "username": "string",
    "password": "string",
    "contact_info": "string"
}
```

#### Pins:
```JSON
{
    "pin_id": "int",
    "pin_name": "string",
    "maker": "string",
    "imgurl": "website link"
}
```

#### Pins_have:
```JSON
{
    "have_id": "int",
    "user_id": "int FK",
    "pin_id": "int FK",
}
```

#### Pins_iso:
```JSON
{
    "iso_id": "int",
    "user_id": "int FK",
    "pin_id": "int FK",
}
```

#### Pin_tags:
```JSON
{
    "tags_id": "int",
    "tag_name": "string",
    "pin_id": "int FK",
}
```

### **-----LOGIN and REGISTER-----**

### [POST]  /auth/register  -- creates a new user

WHAT TO SEND
    
```JSON
{
    "username": "string",
    "password": "string",
    "contact_info": "string",
}
```

WHAT YOU GET BACK

```JSON
{
    "user_id": "integer",
    "username": "string",
    "contact_info": "string"
}
```


### [POST]  /auth/login  -- logs in an existing user

WHAT TO SEND

```JSON
{
    "username": "string",
    "password": "string"
}
```

WHAT YOU GET BACK
** Need to fix user_id in model or something
```JSON
{
    "user_id": "integer",
    "message": "Welcome back username",
    "token": "TOKEN"
}
```

## **-----USERS-----**

### [GET] /users/:user_id -- gets a particular user's information

WHAT YOU GET BACK

```JSON
{
    "user_id": 2,
    "username": "rei_hino",
    "contact_info": "sailor_mars"
}
```

### [GET] /users/:user_id/iso -- gets user's ISOs

WHAT YOU GET BACK

```JSON
[
    {
        "pin_id": 2,
        "pin_name": "Astral Serenity",
        "imgurl": "https://www.instagram.com/p/CW4D3YwL8TjSuF-d0phzfcBvAaY_X_itXtPWI00/",
        "maker": "astral-pins",
        "user_id": 2,
        "username": "rei_hino"
    },
    {
        "pin_id": 3,
        "pin_name": "Art Nouveau Serenity Pastel Variant",
        "imgurl": "https://www.instagram.com/p/CSiW5xiFs0H/",
        "maker": "moon-rabbit-pins",
        "user_id": 2,
        "username": "rei_hino"
    }
]
```


### [GET] /users/:user_id/have -- gets user's pins available for trade

WHAT YOU GET BACK

```JSON
[
    {
        "pin_id": 3,
        "pin_name": "Art Nouveau Serenity Pastel Variant",
        "imgurl": "https://www.instagram.com/p/CSiW5xiFs0H/",
        "maker": "moon-rabbit-pins",
        "user_id": 3,
        "username": "minako_aino"
    },
    {
        "pin_id": 1,
        "pin_name": "Summertime Usagi Pop",
        "imgurl": "https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/",
        "maker": "pastel-shooting-star",
        "user_id": 3,
        "username": "minako_aino"
    },
    {
        "pin_id": 4,
        "pin_name": "Sailor Moon NOUVEAU Usagi",
        "imgurl": "https://www.instagram.com/p/CV4SIHYMior9IXyDEmBh-UBfnfFnx6k4Qda2eY0/",
        "maker": "nyxxi-pins",
        "user_id": 3,
        "username": "minako_aino"
    }
]
```

### [PUT] /users/:user_id -- update's a logged in user's information as long as the username and contact information are not listed somewhere else

WHAT TO SEND

```JSON
{
    "username": "string",
    "password": "string",
    "contact_info": "string"
}
```

WHAT YOU GET BACK

```JSON
{
    "user_id": 1,
    "username": "princess_serenity",
    "contact_info": "@neo_queen_serenity"
}
]
```


### [DELETE] /users/:user_id -- Only the logged in user or an admin will be able to delete an account

WHAT YOU GET BACK

```JSON
{
    "user_id": 1,
    "username": "princess_serenity",
    "contact_info": "@serenity"
}
```

## **-----PINS-----**

### [GET] /pins/:pin_id -- Gets a pin's information by its pin_id

WHAT YOU GET BACK

```JSON
{
    "pin_id": 1,
    "pin_name": "Summertime Usagi Pop",
    "maker": "pastel-shooting-star",
    "imgurl": "https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/"
}
```


###  [GET] /pins/maker/:maker

WHAT TO SEND
:maker will be formatting correctly from an input that puts the hyphens where spaces show up

WHAT YOU GET BACK

```JSON
[
    {
        "pin_id": 1,
        "pin_name": "Summertime Usagi Pop",
        "maker": "pastel-shooting-star",
        "imgurl": "https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/"
    },
    {
        "pin_id": 5,
        "pin_name": "Pin on Pin Egyptian Goddess Bast",
        "maker": "pastel-shooting-star",
        "imgurl": "https://cdn.shopify.com/s/files/1/0557/3594/3342/products/20210707_162003_1024x1024@2x.jpg?v=1626969050"
    }
]
```

### [GET] /pins/:pin_id/iso -- Shows all the users that are ISO a pin found by its pin_id

WHAT YOU GET BACK
```JSON
[
    {
        "pin_id": 3,
        "username": "princess_serenity"
    },
    {
        "pin_id": 3,
        "username": "rei_hino"
    }
]
```

### [GET] /pins/:pin_id/have -- Shows all the users that have a pin found by its pin_id available for trade

WHAT YOU GET BACK
```JSON
[
    {
        "pin_id": 4,
        "username": "princess_serenity"
    },
    {
        "pin_id": 4,
        "username": "minako_aino"
    }
]
```

### [POST] /pins/:pin_id/have - Adding a pin that exists to a user's have list (for trade). Note: If a user is ISO of the pin, they cannot also list it as a pin they have (and vice versa)

WHAT YOU GET BACK

```JSON
{
    "have_id": 6,
    "user_id": 1,
    "pin_id": 1,
    "pin_name": "Summertime Usagi Pop",
    "maker": "pastel-shooting-star",
    "imgurl": "https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/"
}
```

### [POST] /pins/:pin_id/iso - Adding a pin that exists to a user's ISO list. Note: If a user has listed that they have the pin, they cannot also list it as a pin they are ISO (and vice versa)

WHAT YOU GET BACK

```JSON
{
    "iso_id": 5,
    "user_id": 1,
    "pin_id": 5,
    "pin_name": "Pin on Pin Egyptian Goddess Bast",
    "maker": "pastel-shooting-star",
    "imgurl": "https://cdn.shopify.com/s/files/1/0557/3594/3342/products/20210707_162003_1024x1024@2x.jpg?v=1626969050"
}
```


### [DELETE] /pins/:pin_id/have/:have_id -- Removing a pin from a logged in user's have list

```JSON
{
    "have_id": 1,
    "user_id": 1,
    "pin_id": 2,
    "pin_name": "Astral Serenity",
    "maker": "astral-pins",
    "imgurl": "https://www.instagram.com/p/CW4D3YwL8TjSuF-d0phzfcBvAaY_X_itXtPWI00/"
}
```

### [DELETE] /pins/:pin_id/iso/:iso_id -- Removing an ISO from a logged in user's ISO list
WHAT YOU GET BACK

```JSON
{
    "iso_id": 2,
    "user_id": 1,
    "pin_id": 3,
    "pin_name": "Art Nouveau Serenity Pastel Variant",
    "maker": "moon-rabbit-pins",
    "imgurl": "https://www.instagram.com/p/CSiW5xiFs0H/"
}
```

### [POST] /pins -- create a new pin entry

WHAT YOU SEND
```JSON
{
      "pin_id": "int",
      "pin_name": "string",
      "maker": "string with spaces",
      "imgurl": "string url"
    }
```

WHAT YOU GET BACK

```JSON
{
      "pin_id": "1",
      "pin_name": "Summertime Usagi Pop",
      "maker": "pastel-shooting-star",
      "imgurl": "https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/"
    }
```

### [PUT] /pins/:pin_id -- update an existing pin entry

WHAT YOU SEND
```JSON
{
      "pin_id": "int",
      "pin_name": "string",
      "maker": "string with spaces",
      "imgurl": "string url"
    }
```

WHAT YOU GET BACK

```JSON
{
      "pin_id": "1",
      "pin_name": "Summertime Usagi Pop",
      "maker": "pastel-shooting-star",
      "imgurl": "https://www.instagram.com/p/CRhGSWHr4h18xiDeoyzFbCGzMjhrfOjlbe8LEQ0/"
}
```

### [DELETE] /pins/:pin_id -- deletes a pin by pin_id. Will be reserved only for admins


WHAT YOU GET BACK

```JSON
{
    "message": "Pin deleted!"
}
```

## **-----PIN TAGS-----**

### [GET] /pins/tags/:tag_name -- Returns all pins that have the associated tag name

WHAT YOU GET BACK

```JSON
[
    {
        "pin_id": 2,
        "pin_name": "Astral Serenity",
        "maker": "astral-pins",
        "imgurl": "https://www.instagram.com/p/CW4D3YwL8TjSuF-d0phzfcBvAaY_X_itXtPWI00/",
        "tag_name": "princess-serenity"
    },
    {
        "pin_id": 3,
        "pin_name": "Art Nouveau Serenity Pastel Variant",
        "maker": "moon-rabbit-pins",
        "imgurl": "https://www.instagram.com/p/CSiW5xiFs0H/",
        "tag_name": "princess-serenity"
    },
    {
        "pin_id": 4,
        "pin_name": "Sailor Moon NOUVEAU Usagi",
        "maker": "nyxxi-pins",
        "imgurl": "https://www.instagram.com/p/CV4SIHYMior9IXyDEmBh-UBfnfFnx6k4Qda2eY0/",
        "tag_name": "princess-serenity"
    }
]
```

### [GET] /pins/:pin_id/tags -- Returns all tags for that pin_id

WHAT YOU GET BACK

```JSON
[
    {
        "pin_id": 2,
        "tag_name": "sailor-moon",
        "pin_name": "Astral Serenity",
        "maker": "astral-pins",
        "imgurl": "https://www.instagram.com/p/CW4D3YwL8TjSuF-d0phzfcBvAaY_X_itXtPWI00/"
    },
    {
        "pin_id": 2,
        "tag_name": "princess-serenity",
        "pin_name": "Astral Serenity",
        "maker": "astral-pins",
        "imgurl": "https://www.instagram.com/p/CW4D3YwL8TjSuF-d0phzfcBvAaY_X_itXtPWI00/"
    }
]
```

### [POST] /pins/:pin_id/tags -- creates a new tag for that pin by its pin_id

WHAT YOU SEND
```JSON
{
    "tag_name": "string with or without spaces"
}
```

WHAT YOU GET BACK

```JSON
{
    "tags_id": 11,
    "tag_name": "neo-queen-serenity",
    "pin_id": 2
}
```

### [DELETE] /pins/:pin_id/tags/:tag_id -- deletes a tag for a specific pin by pin_id and tag_id

WHAT YOU GET BACK

```JSON
{
    "message": "Tag deleted!"
}
```