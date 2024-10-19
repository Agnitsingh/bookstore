# from flask import Flask,render_template,request, jsonify
# from flask_cors import CORS
# import pickle
# import numpy as np

# popular_df = pickle.load(open('./model/popular.pkl', 'rb'))
# pt = pickle.load(open('./model/pt.pkl', 'rb'))
# books = pickle.load(open('./model/books.pkl', 'rb'))
# similarity_scores = pickle.load(open('./model/similarity_scores.pkl', 'rb'))

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173", "supports_credentials": True}})

# # @app.route('/recommend')
# # def index():
# #     return render_template('index.html',
# #                            book_name = list(popular_df['Book-Title'].values),
# #                            author=list(popular_df['Book-Author'].values),
# #                            image=list(popular_df['Image-URL-M'].values),
# #                            votes=list(popular_df['num_ratings'].values),
# #                            rating=list(popular_df['avg_rating'].values)
# #                            )



# # Define the /recommend endpoint
# @app.route('/recommend')
# def recommend():
#     # Format the data into a list of dictionaries
#     high_ratings_data = []
#     for index, row in popular_df.iterrows():
#         book_data = {
#             "book_name": row['Book-Title'],
#             "author": row['Book-Author'],
#             "image": row['Image-URL-M'],
#             "votes": row['num_ratings'],
#             "rating": row['avg_rating']
#         }
#         high_ratings_data.append(book_data)

#     # Return the data as JSON
#     return jsonify(high_ratings_data)

# @app.route('/')
# def recommend_ui():
#     return render_template('recommend.html')

# @app.route('/recommend_books',methods=['post'])
# def recommend_book():
#     user_input = request.form.get('user_input')
#     index = np.where(pt.index == user_input)[0][0]
#     similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]

#     data = []
#     for i in similar_items:
#         item = []
#         temp_df = books[books['Book-Title'] == pt.index[i[0]]]
#         item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
#         item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
#         item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))

#         data.append(item)

#     print(data)

#     return render_template('recommend.html',data=data)

# if __name__ == '__main__':
#     app.run(debug=True)


import pickle
import numpy as np
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "supports_credentials": True}})

# Load your data here
popular_df = pickle.load(open('./model/popular.pkl', 'rb'))
pt = pickle.load(open('./model/pt.pkl', 'rb'))
books = pickle.load(open('./model/books.pkl', 'rb'))
similarity_scores = pickle.load(open('./model/similarity_scores.pkl', 'rb'))

# Define your routes
@app.route('/recommend')
def recommend():
    # Format the data into a list of dictionaries
    high_ratings_data = []
    for index, row in popular_df.iterrows():
        book_data = {
            "name": row['Book-Title'],
            "author": row['Book-Author'],
            "imageUrl": row['Image-URL-M'],
            "votes": row['num_ratings'],
            "rating": row['avg_rating'],
            "id": f"{row['Book-Title']}_{row['Book-Author']}"
        }
        high_ratings_data.append(book_data)

    # Return the data as JSON
    return jsonify(high_ratings_data)

@app.route('/')
def recommend_ui():
    return render_template('recommend.html')

@app.route('/recommend_books', methods=['POST'])
def recommend_book():
    
    data = request.get_json()

    user_input = data.get("user_input")
    
    index = np.where(pt.index == user_input)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]

    data = []
    for i in similar_items:
        item = {}
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        # item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        # item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        # item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))

        item["name"] = temp_df.drop_duplicates('Book-Title')['Book-Title'].values[0]
        item["author"] = temp_df.drop_duplicates('Book-Title')['Book-Author'].values[0]
        item["imageUrl"] = temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values[0]
        item["id"] = f"{item['name']}_{item['author']}"

        data.append(item)

    print(data)

    # return render_template('recommend.html', data=data)
    return data

if __name__ == '__main__':
    app.run(debug=True)
