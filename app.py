from flask import Flask, json, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True 
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/cybrary_dev_test'
db = SQLAlchemy(app)

class Article(db.Model):

    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key = True)
    data = db.Column(db.JSON)

    def __init__(self, id, data):
        self.id = id
        self.data = data

    # def __repr__(self):
    #     return "ID: {}, Data: {}".format(self.id, self.data["post_author"])


def get_articles():
    with app.open_resource('articles.json') as json_file:
        json_data = json.load(json_file)
        for article_obj in json_data:
            new_article = Article(article_obj["ID"], article_obj)
            db.session.add(new_article)
            db.session.commit()


get_articles()

@app.route('/')
def root():
    return "This is the root, don't leave this open in production!"

@app.route('/articles')
def article_data():
    articles = [a.data for a in Article.query.all()]
    return jsonify(articles)


if __name__ == '__main__':
    app.run(port=3000,debug=True)
