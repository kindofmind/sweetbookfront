<template>
        <div class="rounded mx-2 my-2 ">
                <div class="row">
                    <div class="col-md-auto">
                <h2 class="h2">{{ recipe.name}}</h2>
                    </div>
                    <div class="col order-last text-right">
                        <img src="/ava/dv.jpg"  width="35" height="35" class="rounded-circle">
                        Dart V.
                    </div>
                </div>

                <p class="h3 text-muted mr-1">{{ recipe.description }}</p>
                <hr>
                <div class="row">
                    <div class="col-md-auto">
                        <h1 class="h4">Категории</h1>
                        <p><a href="#" v-for="category in recipe.categories" :key="category.id" class="badge badge-secondary mr-1"> {{
                            category.name }} </a></p>
                    </div>
                    <div class="col-md-auto">
                        <h1 class="h4">Ингредиенты</h1>
                        <p><a href="#" v-for="composition in recipe.compositions" :key="composition.id" class="badge badge-dark mr-1">
                            {{ composition.ingredient.name }} </a></p>
                    </div>
                </div>
                <hr class="mt-n2">
                <div class="row">
                    <div class="col-md-auto">
                        <a class="btn btn-secondary my-1" href="#" role="button">Читать рецепт</a>

                        <button type="button" class="btn btn-dark">
                            Рейтинг <span class="badge badge-light">4</span>
                        </button>
                    </div>
                </div>
            </div>
</template>

<script>
export default {
name: 'recipeitem',
props: ['recipe']

}

</script>
