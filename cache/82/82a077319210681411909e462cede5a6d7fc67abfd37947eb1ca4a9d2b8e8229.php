<?php

/* home.html */
class __TwigTemplate_33be2deee9800214878644b7e623e105fb206edb7344d8fb5266e507dec9c0de extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<h1>";
        echo twig_escape_filter($this->env, (isset($context["fullname"]) ? $context["fullname"] : null), "html", null, true);
        echo "</h1>";
    }

    public function getTemplateName()
    {
        return "home.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  19 => 1,);
    }
}
/* <h1>{{ fullname }}</h1>*/
